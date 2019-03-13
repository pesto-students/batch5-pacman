import React, { Component } from 'react';
import { initGridState, getFoods, getGhosts, getPacman, getWalls, getEnergizers, entityToCode } from './gameCore';
import { PacmanBoard } from './PacmanBoard';
class PacmanGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridState: [],
    };
  }
  setInitialGameState = () => {
    const canvasWidth = this.props.width;
    const cellsInEachRow = this.props.numberofCells;
    const gridSize = canvasWidth / cellsInEachRow;

    const entityApplier = (entityLocations, entityCode) => {
      for (const [x, y] of entityLocations) {
        gridState[x][y] = entityCode;
      }
    };
    let gridState = initGridState(cellsInEachRow, cellsInEachRow);

    entityApplier(getFoods(), entityToCode('food'));
    entityApplier(getPacman(), entityToCode('pacman'));
    entityApplier(getWalls(cellsInEachRow), entityToCode('wall'));
    entityApplier(getGhosts(), entityToCode('ghost'));
    entityApplier(getEnergizers(), entityToCode('energizer'));

    this.setState({ gridState, gridSize });
  }

  componentDidMount() {
    this.setInitialGameState();
  }

  render() {
    return <PacmanBoard gridSize={this.state.gridSize} gridState={this.state.gridState} />
  }
}

export default PacmanGame;
