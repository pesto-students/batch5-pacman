import React, { Component } from 'react';
import { Circle, Image } from 'react-konva';
import PropTypes from 'prop-types';
import {
  entitiesAnimationDurationInSecond, ghostImages, colorCode, locationIn2D,
} from './constants';
import { locationOnCanvas } from './gameCore';


class AnimateEntity extends Component {
  componentDidMount() {
    this.animate(this.node, this.center);
  }

  componentDidUpdate() {
    this.animate(this.node, this.center);
  }

  killerCell = ({
    entity, gridSize, ghostIndex, gridX, gridY,
  }) => {
    const image = new window.Image(gridSize, gridSize);
    image.src = (entity === 'scatterGhost') ? ghostImages[4] : ghostImages[ghostIndex];
    return (
      <Image
        ref={(node) => {
          this.node = node;
          this.center = false;
        }}
        {...locationOnCanvas({
          gridX, gridY, gridSize, centerEntity: false,
        })}
        image={image}
      />
    );
  }

  pacmanCell = ({ entity, gridSize }) => (
    <Circle
      ref={(node) => {
        this.node = node;
        this.center = true;
      }}
      radius={gridSize / 2}
      fill={colorCode[entity]}
    />
  )

  animate(node, center) {
    const { location: { x, y }, gridSize } = this.props;
    const { x: tempx, y: tempy } = locationOnCanvas({
      gridX: x, gridY: y, gridSize, centerEntity: center,
    });

    if (node !== undefined) {
      node.to({
        x: tempx,
        y: tempy,
        duration: entitiesAnimationDurationInSecond,
      });
    }
  }

  render() {
    const {
      location: { x: gridX, y: gridY }, gridSize, entity, ghostIndex,
    } = this.props;

    if (entity === 'ghost' || entity === 'scatterGhost') {
      return this.killerCell({
        gridX, gridY, gridSize, entity, ghostIndex,
      });
    }
    return this.pacmanCell({
      gridSize, entity,
    });
  }
}

AnimateEntity.propTypes = {
  location: locationIn2D.isRequired,
  gridSize: PropTypes.number.isRequired,
  ghostIndex: PropTypes.number,
  entity: PropTypes.string.isRequired,
};

AnimateEntity.defaultProps = {
  ghostIndex: 0,
};

export default AnimateEntity;
