import React from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

class Cell extends React.Component {
  shouldComponentUpdate(newprops) {
    const { x: prevPostionX, y: prevPostionY, entity: prevEntity } = this.props;
    const { x: newPositionX, y: newPositionY, entity: newEntity } = newprops;
    return !(prevPostionX === newPositionX
      && prevPostionY === newPositionY
      && prevEntity === newEntity);
  }

  render() {
    const {
      x, y, gridSize, entity,
    } = this.props;
    const colorCode = {
      pacman: 'yellow',
      food: 'green',
      ghost: 'red',
      scatterGhost: '#CCD0D7',
      wall: '#13326D',
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
  }
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  gridSize: PropTypes.number.isRequired,
  entity: PropTypes.string.isRequired,
};

export default Cell;
