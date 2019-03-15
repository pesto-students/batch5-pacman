import React from 'react';
import { Rect } from 'react-konva';

const Cell = ({ x, y, gridSize, entity, hasPacman }) => {
  const colorCode = {
    pacman: 'yellow',
    food: 'green',
    ghost: 'red',
    wall: 'brown',
    energizer: 'cyan',
  };
  let color = colorCode[entity] || 'black';
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