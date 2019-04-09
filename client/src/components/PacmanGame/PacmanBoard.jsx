import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { codeToEntity, boardEdgeInPixel, locationIn2D } from './constants';
import Cell from './Cell';
import AnimateEntity from './AnimateEntity';

const PacmanBoard = ({
  gridState,
  gridSize,
  ghosts,
  players,
  clientPrediction,
  playerId: myId,
  fright,
}) => {
  const nonMovingCells = gridState
    .map((row, rowIndex) => (row.map((_, columnIndex) => {
      const entity = codeToEntity(gridState[rowIndex][columnIndex]);
      const uniqueKey = `row-${rowIndex}-col-${columnIndex}-entity-${entity}`;
      return (
        <Cell
          key={uniqueKey}
          gridY={columnIndex}
          gridX={rowIndex}
          gridSize={gridSize}
          entity={entity}
        />
      );
    })));
  return (
    <Stage width={boardEdgeInPixel} height={boardEdgeInPixel}>
      <Layer hitGraphEnabled={false}>
        {nonMovingCells}
        {Object.keys(players).map(playerId => (
          <AnimateEntity
            key={playerId}
            location={players[playerId]}
            gridSize={gridSize}
            entity="pacman"
            self={myId === playerId}
            clientPrediction={clientPrediction}
          />
        ))}
        {ghosts.map((ghostLocation, index) => (
          <AnimateEntity
            key={`${ghostLocation + index}`}
            location={ghostLocation}
            gridSize={gridSize}
            ghostIndex={index}
            entity="ghost"
            fright={fright}
          />
        ))}
      </Layer>
    </Stage>
  );
};

PacmanBoard.propTypes = {
  gridSize: PropTypes.number.isRequired,
  gridState: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number.isRequired,
    ).isRequired,
  ).isRequired,
  ghosts: PropTypes.arrayOf(locationIn2D).isRequired,
  players: PropTypes.shape({
    [PropTypes.string.isRequired]: locationIn2D,
  }).isRequired,
  clientPrediction: PropTypes.bool.isRequired,
  playerId: PropTypes.string.isRequired,
  fright: PropTypes.bool.isRequired,
};

export default PacmanBoard;
