import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  initGridState, getFoods, getGhosts,
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
    const gridState = initGridState(cellsInEachRow, cellsInEachRow);

    entityApplier(gridState, getFoods(), entityToCode('food'));
    entityApplier(gridState, getPacman(), entityToCode('pacman'));
    entityApplier(gridState, getWalls(cellsInEachRow), entityToCode('wall'));
    entityApplier(gridState, getGhosts(), entityToCode('ghost'));
    entityApplier(gridState, getEnergizers(), entityToCode('energizer'));

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
