import React from 'react';
import { Rect } from 'react-konva';

const Wall = ({ x, y, gridSize }) => (
  <Rect
    x={x * gridSize}
    y={y * gridSize}
    width={gridSize}
    height={gridSize}
    fill="blue"
  />
);

export default Wall;