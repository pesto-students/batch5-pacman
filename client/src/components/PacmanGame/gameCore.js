import pathfinding from 'pathfinding';

export const initSquareGridState = edge => Array(edge).fill(Array(edge).fill(0))
  .map(arr => arr.slice());

export const getFoods = () => [[15, 8], [17, 10], [24, 23], [20, 37], [36, 17], [5, 37], [10, 39]];

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

export const getEnergizers = () => [[41, 5], [7, 43], [7, 16], [41, 44]];

export const getGhosts = () => [[23, 47, 'RIGHT'], [25, 7, 'LEFT'], [4, 25, 'DOWN'], [25, 26, 'UP']];

export const getPacman = () => [1, 5, 'DOWN'];

export const entityApplier = (gridState,
  entityLocations,
  entityCode) => entityLocations.reduce((prevGridState, [x, y]) => {
  const newGridState = prevGridState;
  newGridState[x][y] = entityCode;
  return newGridState;
}, [...gridState]);


export const codeToEntity = (code) => {
  const entityMap = {
    0: 'free',
    1: 'food',
    2: 'energizer',
    3: 'ghost',
    4: 'wall',
    5: 'pacman',
  };
  return entityMap[code];
};

export const entityToCode = (entity) => {
  const entityMap = {
    free: 0,
    food: 1,
    energizer: 2,
    ghost: 3,
    wall: 4,
    pacman: 5,
  };
  return entityMap[entity];
};

export const isWall = (gridState, { x, y }) => Boolean(gridState[x][y] === entityToCode('wall'));

const choices = {
  UP: [0, -1],
  DOWN: [0, 1],
  RIGHT: [1, 0],
  LEFT: [-1, 0],
};

export const getRandomAdjacentAvailableCell = (gridState, currentLocation) => {
  const { x, y, direction } = currentLocation;
  const listOfChoices = Object.keys(choices);
  const randomIndexInChoice = parseInt(Math.random() * listOfChoices.length, 10);
  const randomChoice = choices[listOfChoices[randomIndexInChoice]];
  const totalX = choices[direction][0] + randomChoice[0];
  const totalY = choices[direction][1] + randomChoice[1];
  if ((totalX === 0) && (totalY === 0)) {
    return getRandomAdjacentAvailableCell(gridState, currentLocation);
  }
  const randomAdjacentCell = {
    x: x + randomChoice[0],
    y: y + randomChoice[1],
    direction: listOfChoices[randomIndexInChoice],
  };

  if (!isWall(gridState, randomAdjacentCell)) {
    return randomAdjacentCell;
  }
  return getRandomAdjacentAvailableCell(gridState, currentLocation);
};

const getGridwithWeights = (grid) => {
  const gridwithWeights = grid.map((array) => {
    const newArray = array.map((element) => {
      let weight = element;
      if (weight === 4) weight = 1;
      if (weight !== 1) weight = 0;
      return weight;
    });
    return newArray;
  });
  return gridwithWeights;
};

export const moveBlinky = (gridState, blinky, pacman) => {
  const { x1, y1 } = blinky;
  const { x, y } = pacman;
  const gridwithWeights = getGridwithWeights(gridState);
  const graph = new pathfinding.Grid(gridwithWeights);
  const finder = new pathfinding.AStarFinder();
  const path = finder.findPath(x1, y1, x, y, graph);
  return path;
};


export const moveInDirection = ({ x, y, direction }) => {
  const newLocation = {
    x: x + choices[direction][0],
    y: y + choices[direction][1],
  };
  return newLocation;
};
