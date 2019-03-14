import React from 'react';
import { Rect } from 'react-konva';

const Ghost = ({ x, y, gridSize }) => (
  <Rect
    x={x * gridSize}
    y={y * gridSize}
    width={gridSize}
    height={gridSize}
    fill="red"
  />
);

export default Ghost;