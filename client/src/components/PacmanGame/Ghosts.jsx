import React from 'react';
import AnimateEntity from './AnimateEntity';

const Ghosts = ({ ghosts, gridSize }) => ghosts.map((location, index) => {
  const { direction, x, y } = location;
  const noGhostDirection = direction === undefined || direction === null;
  const entity = noGhostDirection ? 'scatterGhost' : 'ghost';
  const uniqueKey = `row-${x}-col-${y}-entity-ghost${index}`;
  return (
    <AnimateEntity
      key={uniqueKey}
      location={location}
      gridSize={gridSize}
      entity={entity}
      ghostIndex={index}
    />
  );
});

export default Ghosts;
