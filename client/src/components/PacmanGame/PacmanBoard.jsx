import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { codeToEntity, boardEdgeInPixel, locationIn2D } from './constants';
import Cell from './Cell';
import Ghosts from './Ghosts';
import AnimateEntity from './AnimateEntity';

const PacmanBoard = ({
  gridState,
  gridSize,
  ghosts,
  pacmans,
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
        {Object.keys(pacmans).map(playerId => <AnimateEntity key={playerId} location={pacmans[playerId]} gridSize={gridSize} entity="pacman" />)}
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
  ghosts: PropTypes.arrayOf(locationIn2D).isRequired,
  pacmans: PropTypes.shape({
    [PropTypes.string.isRequired]: locationIn2D,
  }).isRequired,
};

export default PacmanBoard;
