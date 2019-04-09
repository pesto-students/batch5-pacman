import uuidv1 from 'uuid/v1';
import { GAME_UPDATE, GAME_OVER } from '../channels';
import {
  advanceFrameAfterTime,
  boardCorners,
  getGhosts,
  getPacmans,
  boardTranspose,
  newGhostValues,
} from './constants';
import {
  getRandomAdjacentAvailableCell,
  getGridwithWeights,
  chaseLocation,
  initSquareGridState,
  eatFood,
  movePacman,
  dieIfOnGhost,
  addPositionsToArray,
  hasFoodFinished,
} from './core';

class Game {
  constructor({ playerId }) {
    this.gameState = {
      moveGhostsCount: 0,
      scatterGhostspath: [],
      scatterStart: 75,
      players: { [playerId]: {} },
      gridState: [],
      status: 0,
      fright: false,
      frightCount: 0,
    };
    this.available = true;
    this.roomId = uuidv1();
  }

  setInitialGameState = () => {
    const { players } = this.gameState;
    const pacmans = getPacmans();
    Object.keys(players).forEach((playerId, index) => {
      this.gameState.players[playerId] = { ...pacmans[index] };
    });
    this.gameState.gridState = initSquareGridState();
    this.gameState.ghosts = getGhosts().map(([x, y, direction]) => ({
      x, y, direction,
    }));
  };

  getGameResult = () => {
    const { players } = this.gameState;
    return Object.keys(players).reduce((acc, playerId) => {
      const player = players[playerId];
      const result = {
        username: player.username || 'Guest',
        score: player.score,
      };
      return { ...acc, result };
    }, {});
  }

  currentGameState = () => {
    const logTriggerTime = false;
    if (logTriggerTime) {
      // eslint-disable-next-line no-console
      console.log('triggerNextStateAt', new Date().getTime());
    }
    return this.gameState;
  }

  endGame = () => {
    clearInterval(this.gameState.interval);
    this.gameState.status = 2;
  };

  ifPacmanOnGhost = (ghost) => {
    const { players } = this.gameState;
    const { x, y } = ghost;
    const canConsumeGhost = Object.values(players)
      .findIndex(player => (player.x === x) && (player.y === y));
    if (canConsumeGhost !== -1) {
      const playerId = Object.keys(players)[canConsumeGhost];
      this.gameState.players[playerId].score += 100;
      return true;
    }
    return false;
  }

  moveGhosts = ({
    ghosts, gridState, scatterStart, fright,
  }) => {
    let { moveGhostsCount, scatterGhostspath } = this.gameState;
    if (!fright) moveGhostsCount += 1;
    const scatterEnd = scatterStart + 25;
    if (moveGhostsCount === scatterStart) {
      const gridWithWeights = getGridwithWeights(boardTranspose);
      const ghostsPath = ghosts
        .map((ghost, index) => chaseLocation(gridWithWeights, ghost, boardCorners[index]))
        .map(postion => postion.map(arr => ({ x: arr[0], y: arr[1] })));

      scatterGhostspath = ghostsPath
        .map((array, index) => addPositionsToArray(array, index));
      this.gameState.scatterGhostspath = scatterGhostspath;
    }

    if (moveGhostsCount === scatterEnd) {
      const ghostsUpdated = newGhostValues;
      return {
        ghostsUpdated, moveGhostsCount,
      };
    }

    if (moveGhostsCount > (scatterStart + 1) && moveGhostsCount < scatterEnd) {
      const ghostsUpdated = scatterGhostspath.map(path => path[moveGhostsCount - scatterStart]);
      return {
        ghostsUpdated, moveGhostsCount,
      };
    }

    const ghostsUpdated = ghosts.map(
      ({ x, y, direction }) => {
        if (fright) {
          const pacmanOnGhost = this.ifPacmanOnGhost({ x, y });
          if (pacmanOnGhost) return { x: 12, y: 12, direction: 'LEFT' };
        }
        return getRandomAdjacentAvailableCell(gridState, { x, y, direction });
      },
    );
    return {
      ghostsUpdated, moveGhostsCount,
    };
  };

  calculateNextGameState = () => {
    const {
      ghosts, gridState, scatterStart, players, fright, frightCount,
    } = this.gameState;

    const { ghostsUpdated, moveGhostsCount } = this.moveGhosts({
      ghosts, gridState, scatterStart, fright,
    });

    Object.keys(players).forEach((player) => {
      const pacman = players[player];
      const {
        pacmanUpdated, frightMode, count,
      } = movePacman({
        pacman, ghostsUpdated, gridState, fright, frightCount,
      });
      const isDead = dieIfOnGhost({ ghosts: ghostsUpdated, pacman: pacmanUpdated, fright });
      if (isDead) {
        pacman.alive = false;
      }
      if (pacman.alive) {
        const {
          score,
          gridStateAfterEatingFood,
        } = eatFood({ pacman, gridState });
        this.gameState.frightCount = count;
        this.gameState.fright = frightMode;
        this.gameState.players[player] = { ...pacman, ...pacmanUpdated, score };
        this.gameState.gridState = gridStateAfterEatingFood;
        this.gameState.status = isDead ? 2 : 0;
      }
    });

    this.gameState.moveGhostsCount = moveGhostsCount;
    this.gameState.ghosts = ghostsUpdated;
  };

  updateDirection = ({ playerId, direction }) => {
    this.gameState.players[playerId].direction = direction;
  };

  hasGameEnded = () => {
    const { players } = this.gameState;
    const playerStatus = Object.keys(players).map(player => players[player].alive);
    const [isPlayerOneAlive, isPlayerTwoAlive] = playerStatus;
    return !hasFoodFinished(this.gameState) || (!isPlayerOneAlive && !isPlayerTwoAlive);
  };

  startGame = () => {
    this.setInitialGameState();
    // eslint-disable-next-line no-console
    console.log(`[${new Date().toLocaleTimeString()}]`, 'Game started');
    this.gameState.interval = setInterval(() => {
      this.calculateNextGameState();
      const gameEndStatus = this.hasGameEnded();
      if (gameEndStatus) {
        // eslint-disable-next-line no-undef
        io.in(this.roomId).emit(GAME_OVER, this.currentGameState());
        this.endGame();
        return;
      }
      // eslint-disable-next-line no-undef
      io.in(this.roomId).emit('sync', { serverStartTime: new Date().getTime() });
      // eslint-disable-next-line no-undef
      io.in(this.roomId).emit(GAME_UPDATE, this.currentGameState());
    }, advanceFrameAfterTime);
  }
}

export default Game;
