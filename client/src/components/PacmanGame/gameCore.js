import pathfinding from 'pathfinding';
import { getBoard, entityToCode, directionValues } from './constants';

export const initSquareGridState = () => getBoard();

const borderWalls = (numofCells) => {
  const cellsArray = [...Array(numofCells).keys()];
  const topRow = cellsArray.map(col => [col, 0]);
  const bottomRow = cellsArray.map(col => [col, numofCells - 1]);
  const leftColumn = cellsArray.map(row => [0, row]);
  const rightColumn = cellsArray.map(row => [numofCells - 1, row]);
  const wall = [...topRow, ...bottomRow, ...leftColumn, ...rightColumn];
  return wall;
};

const range = (start, end) => (new Array(end - start + 1)).fill(0).map((_, i) => i + start);

const borderTouchingWalls = (num) => {
  const variablesList = [num / 2, Math.floor(num / 4), Math.floor(3 * num / 4)];
  const padding = [1, 2, num - 3, num - 2];
  const topDownWalls = [[num / 2, 1], [num / 2, 2], [num / 2, 47], [num / 2, 48]];
  const walls = [...topDownWalls];
  variablesList.forEach((variable) => {
    padding.forEach((pad) => {
      walls.push([pad, variable]);
    });
  });
  return walls;
};

const singleWalls = (num) => {
  const walls = [];
  const yaxisArray = range((num / 2 - 4), (num / 2 + 4));
  const xaxisArray = range((num / 2 - 7), (num / 2 + 6));
  yaxisArray.forEach((value) => {
    walls.push([(Math.floor(num / 4) + 1), value]);
    walls.push([(Math.floor(3 * num / 4) - 1), value]);
  });
  xaxisArray.forEach((value) => {
    walls.push([value, (num / 2 - 9)]);
    walls.push([value, (num / 2 + 9)]);
  });
  return walls;
};

const perperdicularWalls = () => {
  const walls = [];
  const firstSide = range(10, 17);
  const secondSide = range(33, 40);
  const commonValues = [10, 40];
  const commonArray = [...firstSide, ...secondSide];
  commonArray.forEach((element) => {
    commonValues.forEach((value) => {
      if (element === value) {
        walls.push([element, value]);
      } else {
        walls.push([element, value]);
        walls.push([value, element]);
      }
    });
  });
  return walls;
};

const monsterPen = () => [
  [21, 22], [22, 22], [23, 22], [26, 22], [27, 22], [28, 22],
  [21, 28], [22, 28], [23, 28], [24, 28], [25, 28], [26, 28], [27, 28], [28, 28],
  [21, 23], [21, 24], [21, 25], [21, 26], [21, 27],
  [28, 23], [28, 24], [28, 25], [28, 26], [28, 27]];

const wallGenerator = numofCells => [
  ...monsterPen(), ...perperdicularWalls(), ...singleWalls(numofCells),
  ...borderTouchingWalls(numofCells), ...borderWalls(numofCells)];

export const getWalls = cellsInEachRow => wallGenerator(cellsInEachRow);

export const entityApplier = (gridState,
  entityLocations,
  entityCode) => entityLocations.reduce((prevGridState, [x, y]) => {
  const newGridState = prevGridState;
  newGridState[x][y] = entityCode;
  return newGridState;
}, [...gridState]);

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

export const moveInDirection = ({ x, y, direction }) => {
  const newLocation = {
    x: x + directionValues[direction].x,
    y: y + directionValues[direction].y,
  };
  return newLocation;
};

export const locationOnCanvas = ({
  gridX, gridY, gridSize, centerEntity = false,
}) => {
  const canvasPos = gridPostion => gridPostion * gridSize;
  const [x, y] = [gridX, gridY]
    .map(value => (centerEntity ? canvasPos(value + 0.5) : canvasPos(value)));
  return { x, y };
};

const isAnObject = value => typeof value === 'object' && value !== null;
const isEmptyObject = obj => isAnObject(obj) && Object.keys(obj).length === 0;

const stripEmptyObjValues = obj => Object.keys(obj).reduce((acc, key) => {
  if (isEmptyObject(obj[key])) {
    return acc;
  }
  return {
    ...acc,
    [key]: obj[key],
  };
}, {});

export const getObjectDiffs = ({ oldObj, newObj }) => {
  const diffWithEmptyObjAsValue = Object.keys(newObj).reduce((acc, key) => {
    if (isAnObject(oldObj[key]) && isAnObject(newObj[key])) {
      return {
        ...acc,
        [key]: getObjectDiffs({
          oldObj: oldObj[key],
          newObj: newObj[key],
        }),
      };
    }

    const noDiffInValue = oldObj[key] === newObj[key];

    return noDiffInValue ? acc : {
      ...acc,
      [key]: newObj[key],
    };
  }, {});

  return stripEmptyObjValues(diffWithEmptyObjAsValue);
};
