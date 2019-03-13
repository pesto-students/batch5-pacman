import React from 'react';
import { Rect } from 'react-konva';

const Energizer = ({ x, y, gridSize }) => (
  <Rect
    x={x * gridSize}
    y={y * gridSize}
    width={gridSize}
    height={gridSize}
    fill="pink"
  />
);

export default Energizer;