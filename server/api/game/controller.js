import uuidv1 from 'uuid/v1';
import { GAME_UPDATE } from '../channels';
import {
  boardCorners,
  refreshRate,
  getGhosts,
  getPacman,
  codeToEntity,
  entityToCode,
  boardTranspose,
} from './constants';
import {
  getRandomAdjacentAvailableCell,
  getGridwithWeights,
  chaseLocation,
  moveInDirection,
  isWall,
  initSquareGridState,
} from './core';

class Game {
  constructor({ playerId, socket }) {
    this.gameState = {
      moveGhostsCount: 0,
      scatterGhostspath: [],
      scatterStart: 75,
      players: { [playerId]: {} },
      gridState: [],
      status: 0,
      socket,
    };
    this.available = true;
    this.roomId = uuidv1();
  }

  setInitialGameState = () => {
    const { players } = this.gameState;
    const gridState = initSquareGridState();
    const ghostsArray = getGhosts().map(([x, y, direction]) => ({
      x, y, direction,
    }));
    this.gameState.gridState = gridState;
    this.gameState.ghosts = ghostsArray;
    Object.keys(players).forEach((player, index) => {
      const { x } = getPacman();
      this.gameState.players[player] = { ...getPacman(), x: x + index };
    });
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
    const { socket, ...rest } = this.gameState;
    return rest;
  };

  endGame = () => {
    clearInterval(this.gameState.interval);
  };

  eatFood = ({ pacman: newLocation }) => {
    const { gridState } = this.gameState;
    const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);
    let { score } = newLocation;
    if (entityInCell === 'food') {
      score += 1;
    } else if (entityInCell === 'energizer') {
      score += 5;
    }
    gridState[newLocation.x][newLocation.y] = entityToCode('free');
    this.gameState.gridState = gridState;
    return { score };
  };

  ifAtGhosts = ({ ghosts, pacman }) => {
    const isAtSameLocation = (
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ) => (x1 === x2) && (y1 === y2);

    const ispacmanDead = ghosts
      .some(ghost => isAtSameLocation(ghost, pacman));

    return ispacmanDead;
  };

  dieIfOnGhost = ({ ghosts, pacman }) => {
    if (this.ifAtGhosts({ ghosts, pacman })) {
      this.gameState.status = 2;
      this.endGame();
      return true;
    }
    return false;
  };

  movePacman = ({ pacman, ghostsUpdated, gridState }) => {
    const { x, y, direction } = pacman;

    const pacmanDead = this.dieIfOnGhost({ ghosts: ghostsUpdated, pacman });

    if (pacmanDead) {
      return {
        pacmanUpdated: pacman,
      };
    }

    let newLocation = moveInDirection({ x, y, direction });

    newLocation = isWall(gridState, newLocation) ? {} : moveInDirection({ x, y, direction });
    return {
      pacmanUpdated: { ...pacman, ...newLocation },
    };
  };

  addPositionsToArray = (arr, index) => {
    const scatterTime = 55;
    if (arr.length < scatterTime) {
      arr.push(boardCorners[index]);
      return this.addPositionsToArray(arr, index);
    }
    return arr;
  };

  moveGhosts = ({ ghosts, gridState, scatterStart }) => {
    let { moveGhostsCount, scatterGhostspath } = this.gameState;
    moveGhostsCount += 1;
    const scatterEnd = scatterStart + 55;
    if (moveGhostsCount === scatterStart) {
      const gridWithWeights = getGridwithWeights(boardTranspose);
      const ghostsPath = ghosts
        .map((ghost, index) => chaseLocation(gridWithWeights, ghost, boardCorners[index]))
        .map(postion => postion.map(arr => ({ x: arr[0], y: arr[1] })));

      scatterGhostspath = ghostsPath
        .map((array, index) => this.addPositionsToArray(array, index));
      this.gameState.scatterGhostspath = scatterGhostspath;
    }

    if (moveGhostsCount === scatterEnd) {
      const ghostsUpdated = [
        { x: 1, y: 1, direction: 'LEFT' },
        { x: 23, y: 1, direction: 'LEFT' },
        { x: 1, y: 23, direction: 'LEFT' },
        { x: 23, y: 23, direction: 'LEFT' }];
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
      ({ x, y, direction }) => getRandomAdjacentAvailableCell(gridState, { x, y, direction }),
    );
    return {
      ghostsUpdated, moveGhostsCount,
    };
  };

  calculateNextGameState = () => {
    const {
      ghosts, gridState, scatterStart, players,
    } = this.gameState;

    const { ghostsUpdated, moveGhostsCount } = this.moveGhosts({ ghosts, gridState, scatterStart });

    Object.keys(players).forEach((player) => {
      const pacman = players[player];
      const { pacmanUpdated } = this.movePacman({
        pacman, ghostsUpdated, gridState,
      });

      this.dieIfOnGhost({ ghosts: ghostsUpdated, pacman: pacmanUpdated });

      const {
        score,
      } = this.eatFood({ pacman, gridStateAfterPacmanMove: gridState });

      this.gameState.players[player] = { ...pacman, ...pacmanUpdated, score };
    });

    this.gameState.moveGhostsCount = moveGhostsCount;
    this.gameState.ghosts = ghostsUpdated;
  };

  updateDirection = ({ playerId, direction }) => {
    this.gameState.players[playerId].direction = direction;
  };

  startGame = () => {
    this.setInitialGameState();
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('Game started after 3 seconds');
      this.gameState.interval = setInterval(() => {
        this.calculateNextGameState();
        // eslint-disable-next-line no-undef
        io.in(this.roomId).emit(GAME_UPDATE, this.currentGameState());
      }, refreshRate);
    }, 3000);
  }
}

export default Game;
