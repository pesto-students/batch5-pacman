import React, { Component } from 'react';
// import Konva from 'konva';
// import { Stage, Layer, Text, Circle, Line, Rect } from 'react-konva';

import { initGridState, getFoods, getGhosts, getPacman, getWalls, getEnergizers, entityToCode } from './gameCore';

import { PacmanBoard } from './PacmanBoard';

class PacmanGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridState: '',
    };
  }

  componentDidMount() {
    const canvasWidth = this.props.width;
    const cellsInEachRow = this.props.numberofCells;
    const gridSize = canvasWidth / cellsInEachRow;
    let gridState = initGridState(cellsInEachRow, cellsInEachRow);

    const entityApplier = (entityLocations, entityCode) => {
      for (const [x, y] of entityLocations) {
        gridState[x][y] = entityCode;
      }
      // return gridState;
    };


    // apply entities duummy data
    entityApplier(getFoods(), entityToCode('food'));
    entityApplier(getPacman(), entityToCode('pacman'));
    console.log((gridState[43][5]));
    // console.log(gridState[43])
    entityApplier(getWalls(cellsInEachRow), entityToCode('wall'));
    entityApplier(getGhosts(), entityToCode('ghost'));
    console.log((gridState[43][5]));
    entityApplier(getEnergizers(), entityToCode('energizer'));

    this.setState({ 'gridState': gridState });
    this.setState({ 'gridSize': gridSize });

    console.log(getPacman());
    console.log((gridState[43][5]));
    console.log('food', (gridState[15][9]));

    // console.log('food', getFoods());
    console.log('pacman', getPacman());
    // console.log(getWalls());
    console.log('ghost', getGhosts());

  }
  render() {
    return <PacmanBoard gridSize={this.state.gridSize} gridState={this.state.gridState} />
  }
}

export default PacmanGame;
