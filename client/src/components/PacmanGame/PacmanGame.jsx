import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  initSquareGridState,
  getFoods,
  getGhosts,
  getPacman,
  getWalls,
  getEnergizers,
  entityToCode,
  entityApplier,
} from './gameCore';
import PacmanBoard from './PacmanBoard';

class PacmanGame extends Component {
  state = {
    pacman: {
      x: 0,
      y: 5,
    },
    direction: 'RIGHT',
    gridState: [],
    config: {
      refreshRate: 50,
    },
  }

  componentDidMount() {
    this.setInitialGameState();
  }

  setInitialGameState = () => {
    const { width, numberofCells } = this.props;
    const canvasWidth = width;
    const gridSize = canvasWidth / numberofCells;
    const gridState = initSquareGridState(numberofCells);

    const entitiesLocation = {
      food: getFoods(),
      pacman: getPacman(),
      wall: getWalls(numberofCells),
      ghost: getGhosts(),
      energizer: getEnergizers(),
    };

    const entitiesName = Object.keys(entitiesLocation);

    entitiesName.map(entityName => entityApplier(
      gridState,
      entitiesLocation[entityName],
      entityToCode(entityName),
    ));

    this.setState({ gridState, gridSize });

    const walls = [];
    gridState.forEach((rowArray, rowIndex) => {
      rowArray.forEach((cell, columnIndex) => {
        if (cell === 4) {
          walls.push([rowIndex, columnIndex]);
        }
      });
    });
    this.setState({ walls });
  };

  startGame = () => {
    const { config } = this.state;
    this.animationHandler = setInterval(
      this.animateGame,
      config.refreshRate,
    );
    document.addEventListener('keydown', this.setDirection);
  };

  checkCollision = ({ x, y }) => {
    const { walls } = this.state;
    let hasCollision = false;

    walls.forEach((wall) => {
      if (wall[0] === x && wall[1] === y) {
        hasCollision = true;
      }
    });
    return hasCollision;
  };

  animateGame = () => {
    const { pacman: initialLocation, direction } = this.state;
    const newLocation = { ...initialLocation };

    if (direction === 'RIGHT') {
      newLocation.x = initialLocation.x + 1;
    } else if (direction === 'LEFT') {
      newLocation.x = initialLocation.x - 1;
    } else if (direction === 'UP') {
      newLocation.y = initialLocation.y - 1;
    } else if (direction === 'DOWN') {
      newLocation.y = initialLocation.y + 1;
    }
    if (!this.checkCollision(newLocation)) {
      this.setState({
        pacman: newLocation,
      });
    }
  };

  setDirection = ({ which: keycode }) => {
    const { direction: oldDirection } = this.state;
    let dir;
    if (keycode === 37 && oldDirection !== 'RIGHT') dir = 'LEFT';
    if (keycode === 38 && oldDirection !== 'DOWN') dir = 'UP';
    if (keycode === 39 && oldDirection !== 'LEFT') dir = 'RIGHT';
    if (keycode === 40 && oldDirection !== 'UP') dir = 'DOWN';

    this.setState({
      direction: dir,
    });
  };

  render() {
    const { gridSize, gridState, pacman } = this.state;
    return (
      <div>
        <button type="button" className="" onClick={this.startGame}>
          Start
        </button>
        <PacmanBoard
          gridSize={gridSize}
          gridState={gridState}
          pacman={pacman}
        />
      </div>
    );
  }
}

PacmanGame.propTypes = {
  width: PropTypes.number.isRequired,
  numberofCells: PropTypes.number.isRequired,
};

export default PacmanGame;
