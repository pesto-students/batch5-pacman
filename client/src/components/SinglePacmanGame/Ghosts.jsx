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
      gridY={y}
      gridX={x}
      gridSize={gridSize}
      entity={entity}
      ghostIndex={index}
    />
  );
});

export default Ghosts;
