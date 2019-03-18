import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

const Cell = ({
  x, y, gridSize, entity,
}) => {
  const colorCode = {
    pacman: 'yellow',
    food: 'green',
    ghost: 'red',
    wall: 'brown',
    energizer: 'cyan',
  };
  const color = colorCode[entity] || 'black';
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
};

export default Cell;
