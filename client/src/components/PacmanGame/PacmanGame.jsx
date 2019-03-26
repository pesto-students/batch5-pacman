import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { socketConnection, joinGame, leaveGame } from '../../api/socketService';
import GamePage from '../Layout/GamePage';

import {
  initSquareGridState,
  getGhosts,
  getPacman,
  codeToEntity,
  entityToCode,
  isWall,
  getRandomAdjacentAvailableCell,
  moveInDirection,
  getGridwithWeights,
  chaseLocation,
  boardCorners,
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
      refreshRate: 200,
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
    const { config, pacman } = this.state;
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

    moveGhosts = () => {
      const { ghosts, gridState, scatterStart } = this.state;
      let { moveGhostsCount, scatterGhostspath } = this.state;
      moveGhostsCount += 1;
      const scatterEnd = scatterStart + 55;
      if (moveGhostsCount === scatterStart) {
        const gridWithWeights = getGridwithWeights(gridState);
        const ghostsPath = ghosts
          .map((ghost, index) => chaseLocation(gridWithWeights, ghost, boardCorners[index]))
          .map((postion) => {
            const positionObject = postion.map(arr => ({ x: arr[0], y: arr[1] }));
            return positionObject;
          });
        scatterGhostspath = ghostsPath.map((array, index) => {
          const newArray = this.addPositionsToArray(array, index);
          return newArray;
        });
        this.setState({
          scatterGhostspath,
        });
      }

      if (moveGhostsCount === scatterEnd) {
        const ghostsUpdated = [{ x: 1, y: 1, direction: 'LEFT' },
          { x: 23, y: 1, direction: 'LEFT' }, { x: 1, y: 23, direction: 'LEFT' },
          { x: 23, y: 23, direction: 'LEFT' }];
        return {
          gridState, ghosts: ghostsUpdated, moveGhostsCount,
        };
      }

      if (moveGhostsCount > (scatterStart + 1) && moveGhostsCount < scatterEnd) {
        const ghostsUpdated = scatterGhostspath.map(path => path[moveGhostsCount - scatterStart]);
        return {
          gridState, ghosts: ghostsUpdated, moveGhostsCount,
        };
      }

      const ghostUpdated = ghosts.map(({ x, y, direction }) => {
        const newGhostLocation = getRandomAdjacentAvailableCell(gridState, { x, y, direction });

        return newGhostLocation;
      });
      return {
        gridState, ghosts: ghostUpdated, moveGhostsCount,
      };
    };

  setGameStatus = (status) => {
    if (status === 'finish') {
      clearInterval(this.animationHandler);
      this.setState({ status: 2 });
    }
  }

  ifAtGhosts = (newLocation) => {
    const { ghosts } = this.state;
    return ghosts.some(({ x, y }) => (x === newLocation.x && y === newLocation.y));
  };

  movePacman = ({ gridState }) => {
    const gridStateAfterPacmanMove = gridState;
    const {
      pacman, pacman: { x, y, direction },
    } = this.state;

    let newLocation = moveInDirection({ x, y, direction });

    newLocation = isWall(gridState, newLocation) ? {} : moveInDirection({ x, y, direction });
    return {
      pacman: { ...pacman, ...newLocation }, gridStateAfterPacmanMove,
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

  dieIfGhost = (newLocation) => {
    if (this.ifAtGhosts(newLocation)) {
      this.setGameStatus('finish');
    }
  }

  animateGame = () => {
    try {
      const { ghosts, gridState, moveGhostsCount } = this.moveGhosts();
      const {
        pacman, gridStateAfterPacmanMove,
      } = this.movePacman({ gridState });

      const {
        score,
        gridState: gridStateAfterEating,
      } = this.eatFood({ pacman, gridStateAfterPacmanMove });
      this.dieIfGhost(pacman);

      this.setState({
        gridState: gridStateAfterEating,
        score,
        ghosts,
        pacman,
        moveGhostsCount,
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
