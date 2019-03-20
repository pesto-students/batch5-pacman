import React from 'react';
import Cell from './Cell';

const Ghosts = ({ ghosts, gridSize }) => ghosts.map(({ x, y }, index) => {
  const uniqueKey = `row-${x}-col-${y}-entity-ghost${index}`;
  return (
    <Cell
      key={uniqueKey}
      y={y}
      x={x}
      gridSize={gridSize}
      entity="ghost"
    />
  );
});

export default Ghosts;
