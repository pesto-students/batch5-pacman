import React from 'react';
// import Konva from 'konva';
import { Stage, Layer, Circle } from 'react-konva';
import { codeToEntity } from './gameCore';

import Wall from './entities/Wall';
import Ghost from './entities/Ghost';
import Food from './entities/Food';
import Pacman from './entities/Pacman';
import Free from './entities/Free';

function PacmanBoard({ gridState, gridSize }) {
  if (gridState === '') {
    return null;
  }
  console.log(gridSize);
  console.log(codeToEntity(gridState[43][5]));
  let game = [];
  for (let row = 0; row < gridState.length; row++) {
    const column = gridState[row];
    for (let col = 0; col < column.length; col++) {
      const entity = codeToEntity(gridState[row][col]);
      switch (entity) {
        case 'wall':
          game.push(<Wall key={`${row * 100}${col * 100}`} x={col} y={row} gridSize={gridSize} />);
          break;
        case 'food':
          game.push(<Food key={`${row * 100}${col * 100}`} x={col} y={row} gridSize={gridSize} />);
          break;
        case 'ghost':
          game.push(<Ghost key={`${row * 100}${col * 100}`} x={col} y={row} gridSize={gridSize} />);
          break;
        case 'pacman':
          game.push(<Pacman key={`${row * 100}${col * 100}`} x={col} y={row} gridSize={gridSize} />);
          break;

        default:
          game.push(<Free key={`${row * 100}${col * 100}`} x={col} y={row} gridSize={gridSize} />);
          break;
      }

    }
  }

  // console.log(game);


  return <Stage width={500} height={500}>
    <Layer>
      {game}
      {/* <Pacman key={`${23 * 100}${12 * 100}`} x={43} y={5} gridSize={gridSize} /> */}
    </Layer>
  </Stage>
}

export {
  PacmanBoard
};