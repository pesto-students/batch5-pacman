import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { codeToEntity } from './gameCore';
import Cell from './Cell';

function PacmanBoard({ gridState, gridSize, pacman }) {
  return <Stage width={500} height={500}>
    <Layer>
      {
        gridState.map((row, rowIndex) => {
          return (
            row.map((column, columnIndex) => {
              const entity = codeToEntity(gridState[rowIndex][columnIndex]);
              let hasPacman = false;
              if (pacman.x === columnIndex && pacman.y === rowIndex) {
                hasPacman = true;
              }
              return (
                <Cell key={`row-${rowIndex}-col-${columnIndex}`} x={columnIndex} y={rowIndex} gridSize={gridSize} entity={entity} hasPacman={hasPacman} />
              )
            })
          )
        })
      }
    </Layer>
  </Stage>
}

PacmanBoard.propTypes = {
  gridState: PropTypes.number.isRequired,
  gridSize: PropTypes.number.isRequired,
};

export default PacmanBoard;
