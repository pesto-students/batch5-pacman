import React from 'react';
import { Rect } from 'react-konva';

const Cell = ({ x, y, gridSize, entity, hasPacman }) => {
  let color;
  switch (entity) {
    case 'pacman':
      color = 'yellow';
      break;
    case 'food':
      color = 'green';
      break;
    case 'ghost':
      color = 'red';
      break;
    case 'wall':
      color = 'brown';
      break;
    case 'energizer':
      color = 'cyan';
      break;
    default:
      color = 'black';
      break;
  }
  if (hasPacman) {
    color = 'yellow';
  }
  return (
    <Rect
      x={x * gridSize}
      y={y * gridSize}
      width={gridSize}
      height={gridSize}
      fill={color}
    />
  )
};

export default Cell;