import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {
  socketConnection, joinGame, leaveGame, currentGameState,
} from '../../api/socketService';
import GamePage from '../Layout/GamePage';
import {
  boardCorners, codeToEntity, entityToCode, getGhosts, getPacman, advanceFrameAfterTime,
} from './constants';
import {
  initSquareGridState,
  isWall,
  getRandomAdjacentAvailableCell,
  moveInDirection,
  getGridwithWeights,
  chaseLocation,
} from './gameCore';
import PacmanBoard from './PacmanBoard';

class PacmanGame extends Component {
  state = {
    pacman: {
      x: 1,
      y: 5,
      direction: 'RIGHT',
    },
    ghosts: [],
    score: 0,
    status: 0, // 0 - Not-started, 1 - Progress, 2 - Finished, 3 - Paused
    gridState: [],
    config: {
      refreshRate: advanceFrameAfterTime,
    },
    moveGhostsCount: 0,
    scatterGhostspath: [],
    scatterStart: 75,
  };

  componentDidMount() {
    // eslint-disable-next-line no-console
    socketConnection(() => { console.log('successfully connected'); });
    this.setInitialGameState();
  }

  componentWillUnmount() {
    leaveGame();
  }

  setInitialGameState = () => {
    const gridState = initSquareGridState();
    const [pacmanX, pacmanY, pacmanDirection] = getPacman();
    const pacman = {
      x: pacmanX, y: pacmanY, direction: pacmanDirection,
    };

    const ghostsArray = getGhosts().map(([x, y, direction]) => ({
      x, y, direction,
    }));
    this.setState({ gridState, pacman, ghosts: ghostsArray });
  }

  startGame = () => {
    const { config, pacman, status } = this.state;
    if (status === 1) {
      let { score } = this.state;
      clearInterval(this.animationHandler);
      score -= 10;
      this.setState({ status: 0, score });
      return;
    }
    if (status === 2) {
      this.setInitialGameState();
      this.setState({
        score: 0,
        moveGhostsCount: 0,
      });
      this.setState({ status: 1 });
    }
    if (status === 0) this.setState({ status: 1 });
    joinGame(pacman);
    this.animationHandler = setInterval(
      this.animateGame,
      config.refreshRate,
    );
    document.addEventListener('keydown', this.setDirection);
  };

  addPositionsToArray = (arr, index) => {
    const scatterTime = 55;
    if (arr.length < scatterTime) {
      arr.push(boardCorners[index]);
      return this.addPositionsToArray(arr, index);
    }
    return arr;
  }

  moveGhosts = ({ ghosts, gridState, scatterStart }) => {
    let { moveGhostsCount, scatterGhostspath } = this.state;
    moveGhostsCount += 1;
    const scatterEnd = scatterStart + 55;
    if (moveGhostsCount === scatterStart) {
      const gridWithWeights = getGridwithWeights(gridState);
      const ghostsPath = ghosts
        .map((ghost, index) => chaseLocation(gridWithWeights, ghost, boardCorners[index]))
        .map(postion => postion.map(arr => ({ x: arr[0], y: arr[1] })));

      scatterGhostspath = ghostsPath
        .map((array, index) => this.addPositionsToArray(array, index));
      this.setState({
        scatterGhostspath,
      });
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

  setGameStatus = (status) => {
    if (status === 'finish') {
      leaveGame();
      clearInterval(this.animationHandler);
      this.setState({ status: 2 });
    }
  }

  ifAtGhosts = ({ ghosts, pacman }) => {
    const isAtSameLocation = (
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ) => (x1 === x2) && (y1 === y2);

    const ispacmanDead = ghosts
      .some(ghost => isAtSameLocation(ghost, pacman));

    return ispacmanDead;
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
  }

  eatFood = ({ pacman: newLocation, gridStateAfterPacmanMove }) => {
    const gridState = gridStateAfterPacmanMove;
    const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);
    let { score } = this.state;
    if (entityInCell === 'food') {
      score += 1;
    } else if (entityInCell === 'energizer') {
      score += 5;
    }
    gridState[newLocation.x][newLocation.y] = entityToCode('free');
    return { score, gridState };
  }

  dieIfOnGhost = ({ ghosts, pacman }) => {
    if (this.ifAtGhosts({ ghosts, pacman })) {
      this.setGameStatus('finish');
      return true;
    }
    return false;
  }

  animateGame = () => {
    try {
      const {
        pacman, ghosts, gridState, scatterStart,
      } = this.state;
      const { ghostsUpdated, moveGhostsCount } = this.moveGhosts(
        { ghosts, gridState, scatterStart },
      );
      const { pacmanUpdated } = this.movePacman({ pacman, ghostsUpdated, gridState });

      this.dieIfOnGhost({ ghosts: ghostsUpdated, pacman: pacmanUpdated });

      const {
        score,
        gridState: gridStateAfterEating,
      } = this.eatFood({ pacman, gridStateAfterPacmanMove: gridState });
      this.setState({
        gridState: gridStateAfterEating,
        score,
        moveGhostsCount,
        ghosts: ghostsUpdated,
        pacman: pacmanUpdated,
      });
    } catch (e) {
      clearInterval(this.animationHandler);
    }
  }

  setDirection = ({ which: keycode }) => {
    const { pacman } = this.state;
    let newDirection;
    if (keycode === 37) newDirection = 'LEFT';
    if (keycode === 38) newDirection = 'UP';
    if (keycode === 39) newDirection = 'RIGHT';
    if (keycode === 40) newDirection = 'DOWN';

    if (newDirection) {
      this.setState({
        pacman: { ...pacman, direction: newDirection },
      });
    }
  }


  render() {
    const { width: canvasWidth, numberofCells: cellsInEachRow } = this.props;
    const gridSize = canvasWidth / cellsInEachRow;
    const {
      gridState, pacman, score, status, ghosts,
    } = this.state;
    return (
      <GamePage
        startGame={this.startGame}
        score={score}
        status={status}
        render={() => (
          <PacmanBoard
            gridSize={gridSize}
            gridState={gridState}
            pacman={pacman}
            ghosts={ghosts}
          />
        )}
      />
    );
  }
}

PacmanGame.propTypes = {
  width: PropTypes.number.isRequired,
  numberofCells: PropTypes.number.isRequired,
};

export default PacmanGame;
