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

    this.state = {
  pacman: {
    x: 1,
    y: 5,
    direction: 'RIGHT',
  },
  ghosts: [
    {
      direction: 'RIGHT',
      x: 19,
      y: 1
    },
    {
      direction: 'UP',
      x: 1,
      y: 19
    },
    {
      direction: 'DOWN',
      x: 23,
      y: 5
    },
    {
      direction: 'LEFT',
      x: 23,
      y: 23
    }
  ],
  score: 0,
  status: 0, // 0 - Not-started, 1 - Progress, 2 - Finished, 3 - Paused
  gridState: [],
  config: {
    refreshRate: 50
  }
};
setInitialGameState = () => {
  const { width: canvasWidth, numberofCells: cellsInEachRow } = this.props;
  const gridSize = canvasWidth / cellsInEachRow;
  const gridState = initSquareGridState(cellsInEachRow);

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
}
moveGhosts = () => {
  const { ghosts } = this.state;
  const newGhosts = ghosts.map(({ x, y, direction }) => {
    const availableBlocks = [];
    switch (direction) {
      case 'RIGHT':
        availableBlocks.push({ x: x + 1, y, direction: 'RIGHT' });
        availableBlocks.push({ x, y: y - 1, direction: 'UP' });
        availableBlocks.push({ x, y: y + 1, direction: 'DOWN' });
        break;
      case 'LEFT':
        availableBlocks.push({ x: x - 1, y, direction: 'LEFT' });
        availableBlocks.push({ x, y: y - 1, direction: 'UP' });
        availableBlocks.push({ x, y: y + 1, direction: 'DOWN' });
        break;
      case 'UP':
        availableBlocks.push({ x, y: y + 1, direction: 'UP' });
        availableBlocks.push({ x: x - 1, y, direction: 'LEFT' });
        availableBlocks.push({ x: x + 1, y, direction: 'RIGHT' });
        break;
      case 'DOWN':
        availableBlocks.push({ x, y: y - 1, direction: 'DOWN' });
        availableBlocks.push({ x: x - 1, y, direction: 'LEFT' });
        availableBlocks.push({ x: x + 1, y, direction: 'RIGHT' });
        break;
    }
    const { gridState } = this.state;
    const possibleBlocks = availableBlocks.reduce((acc, block) => {
      if (!this.checkCollision(block)) {
        return [...acc, block];
      }
      return acc;
    }, []);
    const randomBlockIndex = Math.floor((Math.random() * 10) % possibleBlocks.length);
    const newLocation = possibleBlocks[randomBlockIndex];
    gridState[x][y] = entityToCode('free');
    gridState[newLocation.x][newLocation.y] = entityToCode('ghost');
    this.setState({
      gridState
    });
    return newLocation;
  });
  this.setState({
    ghosts: newGhosts
  });
}
gameStatus = (status) => {
  if (status === 'finish') {
    clearInterval(this.animationHandler);
    this.setState({ status: 2 });
  }
}
animateGame = () => {
  try {
    this.moveGhosts();
    const { x, y, direction } = this.state.pacman;
    const newLocation = { x, y };

    if (direction === 'RIGHT') {
      newLocation['x'] = x + 1;
    } else if (direction === 'LEFT') {
      newLocation['x'] = x - 1;
    } else if (direction === 'UP') {
      newLocation['y'] = y - 1;
    } else if (direction === 'DOWN') {
      newLocation['y'] = y + 1;
    }
    if (!this.checkCollision(newLocation)) {
      let { gridState, score } = this.state;

      const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);

      if (entityInCell === 'food') {
        score++;
      } else if (entityInCell === 'ghost') {
        this.gameStatus('finish');
      }

      gridState[x][y] = entityToCode('free');
      gridState[newLocation.x][newLocation.y] = entityToCode('pacman');
      this.setState({
        gridState,
        score,
        pacman: { ...this.state.pacman, ...newLocation }
      });
    }
  } catch (e) {
    console.log(e);
    clearInterval(this.animationHandler);
  }
};

setDirection = ({ which: keycode }) => {
  const { direction: oldDirection } = this.state.pacman;
  let newDirection;
  if (keycode === 37 && oldDirection !== 'RIGHT') newDirection = 'LEFT';
  if (keycode === 38 && oldDirection !== 'DOWN') newDirection = 'UP';
  if (keycode === 39 && oldDirection !== 'LEFT') newDirection = 'RIGHT';
  if (keycode === 40 && oldDirection !== 'UP') newDirection = 'DOWN';

  if (newDirection) {
    this.setState({
      pacman: { ...this.state.pacman, direction: newDirection }
    });
  }
}
componentDidMount() {
  this.setInitialGameState();
}
render() {
  const { gridSize, gridState, pacman } = this.state;
  return (
    <div>
      <button className="" onClick={this.startGame}>Start</button>
      <div>Score: {this.state.score}</div>
      <div>Status: {this.state.status === 2 ? 'GAME OVER' : this.state.status}</div>
      <PacmanBoard gridSize={this.state.gridSize} gridState={this.state.gridState} pacman={this.state.pacman} />
    </div>
  );
}
}

PacmanGame.propTypes = {
  width: PropTypes.number.isRequired,
  numberofCells: PropTypes.number.isRequired,
};

export default PacmanGame;
