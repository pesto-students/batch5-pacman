import React from 'react';
import { Rect, Circle } from 'react-konva';
import PropTypes from 'prop-types';
import { colorCode } from './constants';
import { locationOnCanvas } from './gameCore';


class Cell extends React.Component {
  shouldComponentUpdate(newprops) {
    const { gridX: prevPostionX, gridX: prevPostionY, entity: prevEntity } = this.props;
    const { gridX: newPositionX, gridX: newPositionY, entity: newEntity } = newprops;
    return !(prevPostionX === newPositionX
      && prevPostionY === newPositionY
      && prevEntity === newEntity);
  }


  eatableCells = ({
    entity, gridSize, gridX, gridY, color,
  }) => {
    const entityRadiusScale = (entity === 'food') ? 0.2 : 0.4;

    return (
      <Circle
        {...locationOnCanvas({
          gridX, gridY, gridSize, centerEntity: true,
        })}
        radius={gridSize * entityRadiusScale}
        fill={color}
      />
    );
  }

  render() {
    const {
      gridX, gridY, gridSize, entity,
    } = this.props;
    const color = colorCode[entity];

    if (!color) {
      return null;
    }


    if (entity === 'food' || entity === 'energizer') {
      return this.eatableCells({
        gridX, gridY, gridSize, entity, color,
      });
    }

    return (
      <Rect
        {...locationOnCanvas({ gridX, gridY, gridSize })}
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
};

export default Cell;
