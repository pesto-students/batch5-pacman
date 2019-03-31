import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { codeToEntity, boardEdgeInPixel } from './constants';
import Cell from './Cell';
import Ghosts from './Ghosts';
import AnimateEntity from './AnimateEntity';

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
          gridY={columnIndex}
          gridX={rowIndex}
          gridSize={gridSize}
          entity={entity}
        />
      );
    })));
  return (
    <Stage width={boardEdgeInPixel} height={boardEdgeInPixel}>
      <Layer hitGraphEnabled={false}>
        {nonMovingCells}
        <AnimateEntity location={pacman} gridSize={gridSize} entity="pacman" />
        <Ghosts ghosts={ghosts} gridSize={gridSize} />
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
