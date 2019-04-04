import pathfinding from 'pathfinding';
import {
  entityToCode,
  getBoard,
  directionValues,
  codeToEntity,
  boardCorners,
} from './constants';

export const initSquareGridState = getBoard;

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

export const isWall = (gridState, { x, y }) => Boolean(gridState[x][y] === entityToCode('wall'));

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

export const moveInDirection = ({ x, y, direction }) => {
  const newLocation = {
    x: x + directionValues[direction].x,
    y: y + directionValues[direction].y,
  };
  return newLocation;
};

export const eatFood = ({ pacman: newLocation, gridState }) => {
  const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);
  let { score } = newLocation;
  if (entityInCell === 'food') {
    score += 1;
  } else if (entityInCell === 'energizer') {
    score += 5;
  }
  // eslint-disable-next-line no-param-reassign
  gridState[newLocation.x][newLocation.y] = entityToCode('free');
  return { score, gridStateAfterEatingFood: gridState };
};

export const ifAtGhosts = ({ ghosts, pacman }) => {
  const isAtSameLocation = (
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ) => (x1 === x2) && (y1 === y2);

  const ispacmanDead = ghosts
    .some(ghost => isAtSameLocation(ghost, pacman));

  return ispacmanDead;
};

export const addPositionsToArray = (arr, index) => {
  const scatterTime = 55;
  if (arr.length < scatterTime) {
    arr.push(boardCorners[index]);
    return addPositionsToArray(arr, index);
  }
  return arr;
};

export const dieIfOnGhost = ({ ghosts, pacman }) => {
  if (ifAtGhosts({ ghosts, pacman })) {
    return true;
  }
  return false;
};


export const movePacman = ({
  pacman, ghostsUpdated, gridState, energizers, freight, freightCount,
}) => {
  const { x, y, direction } = pacman;
  let freightMode = freight;
  let count = freightCount;
  const eatenEnergizerIndex = energizers.findIndex(energy => (energy.x === x) && (energy.y === y));
  if (eatenEnergizerIndex !== -1) {
    energizers.splice(eatenEnergizerIndex, 1);
    freightMode = true;
  }
  if (count > 100) {
    freightMode = false;
    count = 0;
  }
  if (freightMode) count += 1;

  if (!freightMode) {
    const pacmanDead = dieIfOnGhost({ ghosts: ghostsUpdated, pacman });
    if (pacmanDead) {
      return {
        status: 2,
        pacmanUpdated: pacman,
        boost: energizers,
        freightMode,
        count,
      };
    }
  }

  let newLocation = moveInDirection({ x, y, direction });

  newLocation = isWall(gridState, newLocation) ? {} : moveInDirection({ x, y, direction });
  return {
    pacmanUpdated: { ...pacman, ...newLocation },
    status: 0,
    boost: energizers,
    freightMode,
    count,
  };
};

export const hasFoodFinished = ({ gridState }) => {
  let food = false;
  gridState.forEach((row) => {
    row.forEach((cell) => {
      if (cell === entityToCode('food')) {
        food = true;
      }
    });
  });
  return food;
};
