import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

const Cell = ({
  x, y, gridSize, entity, hasPacman,
}) => {
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
  );
};

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  gridSize: PropTypes.number.isRequired,
  entity: PropTypes.number.isRequired,
  hasPacman: PropTypes.bool.isRequired,
};

export default Cell;
