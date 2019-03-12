import React from 'react';
// import Konva from 'konva';
import { Stage, Layer, Circle, Rect } from 'react-konva';

function PacmanBoard(props) {
  return <Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>
      <Rect
        x={20}
        y={50}
        width={100}
        height={100}
        fill="red"
        shadowBlur={10}
      />
      <Circle x={200} y={100} radius={50} fill="green" />
    </Layer>
  </Stage>
}

export {
  PacmanBoard
};