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
    gridSize, ghostIndex, fright,
  }) => {
    const src = (fright) ? ghostImages[4] : ghostImages[ghostIndex];
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

  pacmanCell = ({
    gridSize, direction, clientPrediction, self,
  }) => {
    let src = (self) ? pacmanImages[direction] : pacmanImages.OTHER[direction];
    src = (clientPrediction && self) ? pacmanImages.PREDICT[direction] : src;
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
      location: { x: gridX, y: gridY, direction },
      gridSize, entity, ghostIndex, clientPrediction, self, fright,
    } = this.props;

    if (entity === 'ghost' || entity === 'scatterGhost') {
      return this.killerCell({
        gridX, gridY, gridSize, entity, ghostIndex, fright,
      });
    }
    return this.pacmanCell({
      gridSize, entity, direction, clientPrediction, self,
    });
  }
}

AnimateEntity.propTypes = {
  location: locationIn2D,
  gridSize: PropTypes.number.isRequired,
  ghostIndex: PropTypes.number,
  entity: PropTypes.string.isRequired,
  self: PropTypes.bool,
  clientPrediction: PropTypes.bool,
  fright: PropTypes.bool,
};

AnimateEntity.defaultProps = {
  location: {
    x: 0,
    y: 0,
  },
  self: false,
  fright: false,
  clientPrediction: false,
  ghostIndex: 0,
};

export default AnimateEntity;
