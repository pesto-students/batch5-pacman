import React, { Component } from 'react';
// import Konva from 'konva';
// import { Stage, Layer, Text, Circle, Line, Rect } from 'react-konva';

import { initGridState } from './utils';

import { PacmanBoard } from './PacmanBoard';

class PacmanGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridState: '',
    };
  }

  componentDidMount() {
    const cellsInEachRow = this.props.numberofCells;

    const gridState = initGridState(cellsInEachRow, cellsInEachRow);

    // state mutations


    this.setState({ gridState });
  }
  render() {
    return <PacmanBoard state={this.state.gridState} />
  }
}

export default PacmanGame;
