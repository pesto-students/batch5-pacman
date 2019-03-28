import pathfinding from 'pathfinding';
import { entityToCode, board, directionValues } from './constants';

export const initSquareGridState = () => board;

export const getGridwithWeights = (grid) => {
  const gridwithWeights = grid.map((array) => {
    const newArray = array.map((element) => {
      if (element !== entityToCode('wall')) return 0;
      return 1;
    });
    return newArray;
  });
  return gridwithWeights;
};

export const chaseLocation = (gridwithWeights, currentGhostLocation, targetGhostLocation) => {
  const { x, y } = currentGhostLocation;
  const graph = new pathfinding.Grid(gridwithWeights);
  const finder = new pathfinding.AStarFinder();
  const path = finder.findPath(x, y, targetGhostLocation.x, targetGhostLocation.y, graph);
  return path;
};

const isWall = (gridState, { x, y }) => Boolean(gridState[x][y] === entityToCode('wall'));

export const getRandomAdjacentAvailableCell = (gridState, currentLocation) => {
  const { x, y, direction } = currentLocation;
  const directionChoices = Object.keys(directionValues);
  const randomIndex = parseInt(Math.random() * directionChoices.length, 10);
  const randomChoice = directionValues[directionChoices[randomIndex]];
  const totalX = directionValues[direction].x + randomChoice.x;
  const totalY = directionValues[direction].y + randomChoice.y;
  if ((totalX === 0) && (totalY === 0)) {
    return getRandomAdjacentAvailableCell(gridState, currentLocation);
  }
  const randomAdjacentCell = {
    x: x + randomChoice.x,
    y: y + randomChoice.y,
    direction: directionChoices[randomIndex],
  };

  if (!isWall(gridState, randomAdjacentCell)) {
    return randomAdjacentCell;
  }
  return getRandomAdjacentAvailableCell(gridState, currentLocation);
};
