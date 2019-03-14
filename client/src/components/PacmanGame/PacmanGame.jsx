import React, { Component } from 'react';
import { borderWalls, initGridState, getFoods, getGhosts, getPacman, getEnergizers, entityToCode, entityApplier } from './gameCore';
import { PacmanBoard } from './PacmanBoard';

class PacmanGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridState: '',
    };
  };

  entitiesApplier = (gridState, entitiesObjectWithLocations) => {
    for (const [key, value] of Object.entries(entitiesObjectWithLocations)) {
      for (const [x, y] of value) {
        gridState[x][y] = entityToCode(key);
      }
    }
  }

  componentDidMount() {
    
    const canvasWidth = this.props.width;
    const cellsInEachRow = this.props.numberofCells;
    const gridSize = canvasWidth / cellsInEachRow;
    const gridState = initGridState(cellsInEachRow, cellsInEachRow);

    entityApplier(gridState, borderWalls(cellsInEachRow), entityToCode('wall'));

    const entityLocations = [getFoods(), getPacman(), getGhosts(), getEnergizers()];
    const entities = ['food', 'pacman', 'ghost', 'energizer'];

    const entitiesObjectWithLocations = {};
    entities.forEach((entity, index) => entitiesObjectWithLocations[entity] = entityLocations[index]);

    this.entitiesApplier(gridState, entitiesObjectWithLocations);

    this.setState({ 'gridState': gridState });
    this.setState({ 'gridSize': gridSize });

  }
  render() {
    return <PacmanBoard gridSize={this.state.gridSize} gridState={this.state.gridState} />
  }
}

export default PacmanGame;
