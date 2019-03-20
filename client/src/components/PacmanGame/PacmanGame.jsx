import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GamePage from '../Layout/GamePage';

import {
  initSquareGridState,
  getFoods,
  getGhosts,
  getPacman,
  getWalls,
  codeToEntity,
  getEnergizers,
  entityToCode,
  entityApplier,
  isWall,
  getRandomAdjacentAvailableCell,
  moveInDirection,
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
  };

  componentDidMount() {
    this.setInitialGameState();
  }

  setInitialGameState = () => {
    const { numberofCells: cellsInEachRow } = this.props;
    const gridState = initSquareGridState(cellsInEachRow);

    const entitiesLocation = {
      food: getFoods(),
      pacman: getPacman(),
      wall: getWalls(cellsInEachRow),
      energizer: getEnergizers(),
    };

    const ghostsArray = getGhosts().map(([x, y, direction]) => ({
      x, y, direction,
    }));
    Object.entries(entitiesLocation).forEach(
      ([entityName, entityFunction]) => {
        entityApplier(
          gridState,
          entityFunction,
          entityToCode(entityName),
        );
      },
    );

    this.setState({ gridState, ghosts: ghostsArray });
  }

  startGame = () => {
    const { config } = this.state;
    this.animationHandler = setInterval(
      this.animateGame,
      config.refreshRate,
    );
    document.addEventListener('keydown', this.setDirection);
  };

  moveGhosts = () => {
    const { ghosts, gridState } = this.state;
    const ghostUpdated = ghosts.map(({ x, y }) => {
      const newGhostLocation = getRandomAdjacentAvailableCell(gridState, { x, y });

      return newGhostLocation;
    });
    return {
      gridState, ghosts: ghostUpdated,
    };
  }

  setGameStatus = (status) => {
    if (status === 'finish') {
      clearInterval(this.animationHandler);
      this.setState({ status: 2 });
    }
  }

  movePacman = ({ gridState }) => {
    const gridStateAfterPacmanMove = gridState;
    const {
      pacman, pacman: { x, y, direction },
    } = this.state;
    let { score } = this.state;

    let newLocation = moveInDirection({ x, y, direction });
    if (!isWall(gridState, newLocation)) {
      const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);

      if (entityInCell === 'food') {
        score += 1;
      } else if (entityInCell === 'ghost') {
        this.setGameStatus('finish');
      }

      gridStateAfterPacmanMove[x][y] = entityToCode('free');
      gridStateAfterPacmanMove[newLocation.x][newLocation.y] = entityToCode('pacman');
    } else {
      newLocation = {};
    }
    return {
      pacman: { ...pacman, ...newLocation }, gridStateAfterPacmanMove, score,
    };
  }

  animateGame = () => {
    try {
      const { gridState, ghosts } = this.moveGhosts();
      const {
        pacman, gridStateAfterPacmanMove, score,
      } = this.movePacman({ gridState });

      this.setState({
        gridState: gridStateAfterPacmanMove,
        score,
        ghosts,
        pacman,
      });
    } catch (e) {
      clearInterval(this.animationHandler);
    }
  }

  setDirection = ({ which: keycode }) => {
    const { pacman } = this.state;
    let newDirection;
    if (keycode === 37) newDirection = 'LEFT';
    if (keycode === 38) newDirection = 'TOP';
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
