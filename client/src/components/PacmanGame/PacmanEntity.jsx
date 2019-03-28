import React, { Component } from 'react';
import { Circle } from 'react-konva';
import PropTypes from 'prop-types';
import { entitiesAnimationDurationInSecond } from './constants';


class PacmanEntity extends Component {
  componentDidUpdate() {
    this.animate();
  }

  animate() {
    const { location: { x, y }, gridSize } = this.props;

    this.circle.to({
      x: (x + 0.5) * gridSize,
      y: (y + 0.5) * gridSize,
      duration: entitiesAnimationDurationInSecond,
    });
  }

  render() {
    const { gridSize } = this.props;
    return (
      <Circle
        ref={(node) => {
          this.circle = node;
        }}
        radius={gridSize / 2}
        fill="yellow"
      />
    );
  }
}

PacmanEntity.propTypes = {
  location: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    direction: PropTypes.string,
  }).isRequired,
  gridSize: PropTypes.number.isRequired,
};

export default PacmanEntity;
