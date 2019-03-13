import React from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import { codeToEntity } from './gameCore';
import Cell from './Cell';

function PacmanBoard({ gridState, gridSize }) {
  return <Stage width={500} height={500}>
    <Layer>
      {
        gridState.map((row, rowIndex) => {
          return (
            row.map((column, columnIndex) => {
              const entity = codeToEntity(gridState[rowIndex][columnIndex]);
              return (
                <Cell key={`row-${rowIndex}-col-${columnIndex}`} x={columnIndex} y={rowIndex} gridSize={gridSize} entity={entity} />
              )
            })
          )
        })
      }
    </Layer>
  </Stage>
}

export {
  PacmanBoard
};