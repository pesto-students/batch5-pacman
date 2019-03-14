import React from 'react';
import { Rect } from 'react-konva';

const Free = ({ x, y, gridSize }) => (
  <Rect
    x={x * gridSize}
    y={y * gridSize}
    width={gridSize}
    height={gridSize}
    fill="black"
  />
);

export default Free;