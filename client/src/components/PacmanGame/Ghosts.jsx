import React from 'react';
import Cell from './Cell';

const Ghosts = ({ ghosts, gridSize }) => ghosts.map(({ x, y, direction }, index) => {
  let entity;
  if (direction === undefined || direction === null) {
    entity = 'scatterGhost';
  } else {
    entity = 'ghost';
  }
  const uniqueKey = `row-${x}-col-${y}-entity-ghost${index}`;
  return (
    <Cell
      key={uniqueKey}
      y={y}
      x={x}
      gridSize={gridSize}
      entity={entity}
    />
  );
});

export default Ghosts;
