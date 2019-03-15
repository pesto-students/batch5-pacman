import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { codeToEntity } from './gameCore';
import Cell from './Cell';

const PacmanBoard = ({ gridState, gridSize, pacman }) => (
  <Stage width={500} height={500}>
    <Layer>
      {
        gridState.map((row, rowIndex) => {
          return (
            row.map((column, columnIndex) => {
              const entity = codeToEntity(gridState[rowIndex][columnIndex]);
              return (
                <Cell key={`row-${rowIndex}-col-${columnIndex}`} y={columnIndex} x={rowIndex} gridSize={gridSize} entity={entity} />
              )
            })
          )
        })
      }
    </Layer>
  </Stage>
);

PacmanBoard.propTypes = {
  gridSize: PropTypes.number.isRequired,
  pacman: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ).isRequired,

};

export default PacmanBoard;
