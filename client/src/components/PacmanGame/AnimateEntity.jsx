import React, { Component } from 'react';
import { Image } from 'react-konva';
import PropTypes from 'prop-types';
import {
  entitiesAnimationDurationInSecond, ghostImages, pacmanImages, locationIn2D,
} from './constants';
import { locationOnCanvas, makeSquareImgWithSrc } from './gameCore';


class AnimateEntity extends Component {
  componentDidUpdate() {
    this.animate(this.node, this.center);
  }

  killerCell = ({
    entity, gridSize, ghostIndex,
  }) => {
    const src = (entity === 'scatterGhost') ? ghostImages[4] : ghostImages[ghostIndex];
    const image = makeSquareImgWithSrc({ src, size: gridSize });
    return (
      <Image
        ref={(node) => {
          this.node = node;
          this.center = false;
        }}
        image={image}
      />
    );
  }

  pacmanCell = ({ gridSize, direction }) => {
    const image = makeSquareImgWithSrc({ src: pacmanImages[direction], size: gridSize });
    return (
      <Image
        ref={(node) => {
          this.node = node;
          this.center = false;
        }}
        image={image}
      />
    );
  }

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
      location: { x: gridX, y: gridY, direction }, gridSize, entity, ghostIndex,
    } = this.props;

    if (entity === 'ghost' || entity === 'scatterGhost') {
      return this.killerCell({
        gridX, gridY, gridSize, entity, ghostIndex,
      });
    }
    return this.pacmanCell({
      gridSize, entity, direction,
    });
  }
}

AnimateEntity.propTypes = {
  location: locationIn2D,
  gridSize: PropTypes.number.isRequired,
  ghostIndex: PropTypes.number,
  entity: PropTypes.string.isRequired,
};

AnimateEntity.defaultProps = {
  location: {
    x: 0,
    y: 0,
  },
  ghostIndex: 0,
};

export default AnimateEntity;
