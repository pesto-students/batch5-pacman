import React from 'react';
import { Rect } from 'react-konva';

const KEYS = {left: 37, up: 38, right: 39, down: 40};

class Pacman extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      direction: KEYS.right,
      x: 0,
      y: 0
    }
  }

  render () {
    return (
           <Rect
                x={this.props.x * this.props.gridSize}
                y={this.props.y * this.props.gridSize}
                width={this.props.gridSize}
                height={this.props.gridSize}
                fill="yellow"
              />
    )
  }
}

export default Pacman;