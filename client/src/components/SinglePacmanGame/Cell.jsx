import React from 'react';
import { Rect, Circle, Image } from 'react-konva';
import PropTypes from 'prop-types';
import { colorCode, ghostImages } from './constants';


class Cell extends React.Component {
  shouldComponentUpdate(newprops) {
    const { gridX: prevPostionX, gridX: prevPostionY, entity: prevEntity } = this.props;
    const { gridX: newPositionX, gridX: newPositionY, entity: newEntity } = newprops;
    return !(prevPostionX === newPositionX
      && prevPostionY === newPositionY
      && prevEntity === newEntity);
  }

  locationOnCanvas = ({
    gridX, gridY, gridSize, centerEntity = false,
  }) => {
    const canvasPos = gridPostion => gridPostion * gridSize;
    const [x, y] = [gridX, gridY]
      .map(value => (centerEntity ? canvasPos(value + 0.5) : canvasPos(value)));
    return { x, y };
  };

  killerCells = ({
    entity, ghostIndex, gridSize, gridX, gridY,
  }) => {
    const image = new window.Image(gridSize, gridSize);
    image.src = (entity === 'scatterGhost') ? ghostImages[4] : ghostImages[ghostIndex];

    return (
      <Image
        {...this.locationOnCanvas({ gridX, gridY, gridSize })}
        image={image}
      />
    );
  }

  eatableCells = ({
    entity, gridSize, gridX, gridY, color,
  }) => {
    const entityRadiusScale = (entity === 'food') ? 0.2 : 0.4;

    return (
      <Circle
        {...this.locationOnCanvas({
          gridX, gridY, gridSize, centerEntity: true,
        })}
        radius={gridSize * entityRadiusScale}
        fill={color}
      />
    );
  }

  render() {
    const {
      gridX, gridY, gridSize, entity, ghostIndex,
    } = this.props;
    const color = colorCode[entity];

    if (!color) {
      return null;
    }

    if (entity === 'ghost' || entity === 'scatterGhost') {
      return this.killerCells({
        gridX, gridY, gridSize, entity, ghostIndex,
      });
    }


    if (entity === 'food' || entity === 'energizer') {
      return this.eatableCells({
        gridX, gridY, gridSize, entity, color,
      });
    }

    return (
      <Rect
        {...this.locationOnCanvas({ gridX, gridY, gridSize })}
        width={gridSize}
        height={gridSize}
        fill={color}
      />
    );
  }
}


Cell.propTypes = {
  gridX: PropTypes.number.isRequired,
  gridY: PropTypes.number.isRequired,
  gridSize: PropTypes.number.isRequired,
  entity: PropTypes.string.isRequired,
  ghostIndex: PropTypes.number,
};

Cell.defaultProps = {
  ghostIndex: 0,
};

export default Cell;
