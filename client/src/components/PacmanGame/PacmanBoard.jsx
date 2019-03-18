import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { codeToEntity } from './gameCore';
import Cell from './Cell';

const PacmanBoard = ({ gridState, gridSize }) => (
  <Stage width={500} height={500}>
    <Layer>
      {
        gridState.map((row, rowIndex) => (
          row.map((_, columnIndex) => {
            const entity = codeToEntity(gridState[rowIndex][columnIndex]);
            const uniqueKey = `row-${rowIndex}-col-${columnIndex}-entity${entity}`;
            return (
              <Cell
                key={uniqueKey}
                y={columnIndex}
                x={rowIndex}
                gridSize={gridSize}
                entity={entity}
              />
            );
          })
        ))
      }
    </Layer>
  </Stage>
);

PacmanBoard.propTypes = {
  gridSize: PropTypes.number.isRequired,
  gridState: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number.isRequired,
    ).isRequired,
  ).isRequired,

};

export default PacmanBoard;
