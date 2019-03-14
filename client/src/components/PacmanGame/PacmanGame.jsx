import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  initSquareGridState, getFoods, getGhosts,
  getPacman, getWalls, getEnergizers,
  entityToCode, entityApplier,
} from './gameCore';

import PacmanBoard from './PacmanBoard';

class PacmanGame extends Component {
  state = {
    gridState: '',
    gridSize: '',
  };

  componentDidMount() {
    const { width, numberofCells } = this.props;
    const canvasWidth = width;
    const cellsInEachRow = numberofCells;
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
  }

  render() {
    const { gridSize, gridState } = this.state;
    return <PacmanBoard gridSize={gridSize} gridState={gridState} />;
  }
}

PacmanGame.propTypes = {
  width: PropTypes.number.isRequired,
  numberofCells: PropTypes.number.isRequired,
};

export default PacmanGame;
