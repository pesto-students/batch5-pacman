import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

const PacmanEntity = ({ location: { x, y }, gridSize }) => (
  <Rect
    x={x * gridSize}
    y={y * gridSize}
    width={gridSize}
    height={gridSize}
    fill="yellow"
  />
);

PacmanEntity.propTypes = {
  location: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    direction: PropTypes.string,
  }).isRequired,
  gridSize: PropTypes.number.isRequired,
};

export default PacmanEntity;
