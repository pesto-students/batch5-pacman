import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { codeToEntity } from './gameCore';
import Cell from './Cell';
import Ghosts from './Ghosts';
import PacmanEntity from './PacmanEntity';

const PacmanBoard = ({
  gridState,
  gridSize,
  ghosts,
  pacman,
}) => {
  const nonMovingCells = gridState
    .map((row, rowIndex) => (row.map((_, columnIndex) => {
      const entity = codeToEntity(gridState[rowIndex][columnIndex]);
      const uniqueKey = `row-${rowIndex}-col-${columnIndex}-entity-${entity}`;
      return (
        <Cell
          key={uniqueKey}
          y={columnIndex}
          x={rowIndex}
          gridSize={gridSize}
          entity={entity}
        />
      );
    })));
  return (
    <Stage width={500} height={500}>
      <Layer hitGraphEnabled={false}>
        {nonMovingCells}
        <Ghosts ghosts={ghosts} gridSize={gridSize} />
        <PacmanEntity location={pacman} gridSize={gridSize} />
      </Layer>
    </Stage>
  );
};

PacmanBoard.propTypes = {
  gridSize: PropTypes.number.isRequired,
  gridState: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number.isRequired,
    ).isRequired,
  ).isRequired,
  ghosts: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    direction: PropTypes.string,
  })).isRequired,
  pacman: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    direction: PropTypes.string,
  }).isRequired,
};

export default PacmanBoard;
