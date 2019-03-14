import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  initSquareGridState, getFoods, getGhosts,
  getPacman, getWalls, getEnergizers,
  entityToCode, entityApplier,
} from './gameCore';
import PacmanBoard from './PacmanBoard';

class PacmanGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pacman: {
        x: 0,
        y: 5,
      },
      direction: 'RIGHT',
      score: 0,
      gridState: [],
      config: {
        refreshRate: 50
      }
    };
  }

  setInitialGameState = () => {
    const { width, numberofCells } = this.props;
    const canvasWidth = width;
    const cellsInEachRow = numberofCells;
    // const canvasWidth = this.props.width;
    // const cellsInEachRow = this.props.numberofCells;
    const gridSize = canvasWidth / cellsInEachRow;
    const gridState = initSquareGridState(cellsInEachRow);

    const entitiesLocation = {
      food: getFoods(),
      pacman: getPacman(),
      wall: getWalls(cellsInEachRow),
      ghost: getGhosts(),
      energizer: getEnergizers(),
    };

    const entitiesName = Object.keys(entitiesLocation);

    entitiesName.map(entityName => entityApplier(gridState,
      entitiesLocation[entityName],
      entityToCode(entityName)));

    this.setState({ gridState, gridSize });

    let walls = [];
    gridState.forEach((rowArray, rowIndex) => {
      rowArray.forEach((cell, columnIndex) => {
        if (cell === 4) {
          walls.push([rowIndex, columnIndex]);
        }
      })
    });
    this.setState({ walls });
  }
  startGame = () => {
    this.animationHandler = setInterval(
      this.animateGame,
      this.state.config.refreshRate
    );
    document.addEventListener('keydown', this.setDirection);
  }
  checkCollision = ({ x, y }) => {
    let walls = this.state.walls;
    let hasCollision = false;

    walls.forEach((wall) => {
      if (wall[0] === x && wall[1] === y) {
        hasCollision = true;
      }
    });
    return hasCollision;
  }
  animateGame = () => {
    const initialLocation = this.state.pacman;
    const newLocation = { ...initialLocation };

    const direction = this.state.direction;
    if (direction === 'RIGHT') {
      newLocation['x'] = initialLocation['x'] + 1;
    } else if (direction === 'LEFT') {
      newLocation['x'] = initialLocation['x'] - 1;
    } else if (direction === 'UP') {
      newLocation['y'] = initialLocation['y'] - 1;
    } else if (direction === 'DOWN') {
      newLocation['y'] = initialLocation['y'] + 1;
    }
    if (!this.checkCollision(newLocation)) {
      this.setState({
        pacman: newLocation
      });
    }
  }
  setDirection = ({ which: keycode }) => {
    const oldDirection = this.state.direction;
    let dir;
    if (keycode === 37 && oldDirection !== 'RIGHT') dir = 'LEFT';
    if (keycode === 38 && oldDirection !== 'DOWN') dir = 'UP';
    if (keycode === 39 && oldDirection !== 'LEFT') dir = 'RIGHT';
    if (keycode === 40 && oldDirection !== 'UP') dir = 'DOWN';

    this.setState({
      direction: dir
    });
  }
  componentDidMount() {
    this.setInitialGameState();
  }
  render() {
    return (
      <div>
        <button className="" onClick={this.startGame}>Start</button>
        <PacmanBoard gridSize={this.state.gridSize} gridState={this.state.gridState} pacman={this.state.pacman} />
      </div>
    )
  }
}

PacmanGame.propTypes = {
  width: PropTypes.number.isRequired,
  numberofCells: PropTypes.number.isRequired,
};

export default PacmanGame;
