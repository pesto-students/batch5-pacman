import React from 'react';
import { Rect, Circle, Image } from 'react-konva';
import PropTypes from 'prop-types';
import { colorCode, ghostImages } from './constants';


class Cell extends React.Component {
  shouldComponentUpdate(newprops) {
    const { x: prevPostionX, y: prevPostionY, entity: prevEntity } = this.props;
    const { x: newPositionX, y: newPositionY, entity: newEntity } = newprops;
    return !(prevPostionX === newPositionX
      && prevPostionY === newPositionY
      && prevEntity === newEntity);
  }

  killerCells = ({
    entity, ghostIndex, gridSize, x, y,
  }) => {
    const image = new window.Image(gridSize, gridSize);
    image.src = (entity === 'scatterGhost') ? ghostImages[4] : ghostImages[ghostIndex];
    return (
      <Image
        x={x * gridSize}
        y={y * gridSize}
        image={image}
      />
    );
  }

  render() {
    const {
      x, y, gridSize, entity, ghostIndex,
    } = this.props;
    const color = colorCode[entity];

    if (!color) {
      return null;
    }

    if (entity === 'ghost' || entity === 'scatterGhost') {
      return this.killerCells({
        x, y, gridSize, entity, ghostIndex,
      });
    }


    if (entity === 'food' || entity === 'energizer') {
      const entityRadiusScale = (entity === 'food') ? 0.2 : 0.4;
      return (
        <Circle
          x={(x + 0.5) * gridSize}
          y={(y + 0.5) * gridSize}
          radius={gridSize * entityRadiusScale}
          fill={color}
        />
      );
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
  }
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  gridSize: PropTypes.number.isRequired,
  entity: PropTypes.string.isRequired,
  ghostIndex: PropTypes.number,
};

Cell.defaultProps = {
  ghostIndex: 0,
};

export default Cell;
