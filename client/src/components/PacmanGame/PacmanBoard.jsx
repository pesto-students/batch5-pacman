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
          row.map((column, columnIndex) => {
            const entity = codeToEntity(gridState[rowIndex][columnIndex]);
            return (
              <Cell
                // eslint-disable-next-line react/no-array-index-key
                key={`row-${rowIndex}-col-${columnIndex}`}
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
