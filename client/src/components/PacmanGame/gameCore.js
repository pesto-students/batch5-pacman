export const initSquareGridState = edge => Array(edge).fill().map(() => Array(edge).fill(0));
export const getFoods = () => [[15, 9], [14, 9], [13, 9], [12, 9], [11, 9], [10, 9]];

const wallGenerator = (numberofCells) => {
  const wall = [];
  const int = num => parseInt(num, 10);

  const generateVerticalWalls = () => {
    for (let row = 0; row < numberofCells; row += 1) {
      const leftColCell = [0, row];
      const rightColCell = [numberofCells - 1, row];
      if (row % 2 === 0) {
        const middleRow = [int((numberofCells - 1) / 2), row];
        wall.push(middleRow);
      }
      wall.push(leftColCell);
      wall.push(rightColCell);
    }
  };

  const generateHorizontalWalls = () => {
    for (let col = 0; col < numberofCells; col += 1) {
      const topRowCell = [col, 0];
      const bottomRowCell = [col, numberofCells - 1];
      if (col % 2 === 0) {
        const middleRowCell = [col, int((numberofCells - 1) / 2)];
        wall.push(middleRowCell);
      }
      wall.push(topRowCell);
      wall.push(bottomRowCell);
    }
  };

  generateHorizontalWalls();
  generateVerticalWalls();
  return wall;
};

export const getWalls = cellsInEachRow => wallGenerator(cellsInEachRow);

export const getEnergizers = () => [[4, 6], [9, 1], [1, 9], [13, 13]];

export const getGhosts = () => [[23, 5], [19, 1], [1, 19], [1, 13]];

export const getPacman = () => [[43, 5]];

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
