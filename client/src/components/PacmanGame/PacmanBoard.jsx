import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { codeToEntity } from './gameCore';
import Cell from './Cell';

const PacmanBoard = ({ gridState, gridSize, pacman }) => (
  <Stage width={500} height={500}>
    <Layer>
      {
        gridState.map((row, rowIndex) => (
          row.map((column, columnIndex) => {
            const entity = codeToEntity(gridState[rowIndex][columnIndex]);
            let hasPacman = false;
            if (pacman.x === columnIndex && pacman.y === rowIndex) {
              hasPacman = true;
            }
            return (
              <Cell
                // eslint-disable-next-line react/no-array-index-key
                key={`row-${rowIndex}-col-${columnIndex}`}
                x={columnIndex}
                y={rowIndex}
                gridSize={gridSize}
                entity={entity}
                hasPacman={hasPacman}
              />
            );
          })
        ))
      }
    </Layer>
  </Stage>
);

PacmanBoard.propTypes = {
  gridState: PropTypes.number.isRequired,
  gridSize: PropTypes.number.isRequired,
};

export default PacmanBoard;
