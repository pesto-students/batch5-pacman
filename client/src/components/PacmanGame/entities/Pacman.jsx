import React from 'react';
import { Rect } from 'react-konva';

const Pacman = ({ x, y, gridSize }) => (
  <Rect
    x={x * gridSize}
    y={y * gridSize}
    width={gridSize}
    height={gridSize}
    fill="yellow"
  />
);

export default Pacman;