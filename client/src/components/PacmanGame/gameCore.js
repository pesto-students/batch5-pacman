export const initGridState = (rows, cols) => {
  return Array(rows).fill(Array(cols).fill(0)).map(arr => arr.slice());
};

export const borderWalls = numofCells => {
  const cellsArray = [...Array(numofCells).keys()];
  const topRow = cellsArray.map(col => [col, 0]);
  const bottomRow = cellsArray.map(col => [col, numofCells - 1]);
  const leftColumn = cellsArray.map(row => [0, row]);
  const rightColumn = cellsArray.map(row => [numofCells - 1 , row]);
  const wall = [...topRow,...bottomRow,...leftColumn,...rightColumn];
  return wall;
}


export const getFoods = () => [[15, 9], [14, 9], [13, 9], [12, 9], [11, 9], [10, 9]];

export const getEnergizers = () => [[4, 6], [9, 1], [1, 9], [13, 13]];

export const getGhosts = () => [[23, 5], [19, 1], [1, 19], [1, 13]];

export const getPacman = () => [[43, 5]];

export const entityApplier = (gridState, entityLocations, entityCode) => {
  for (const [x, y] of entityLocations) {
    gridState[x][y] = entityCode;
  }
};


export const codeToEntity = code => {
  const entityMap = {
    0: 'free',
    1: 'food',
    2: 'energizer',
    3: 'ghost',
    4: 'wall',
    5: 'pacman'
  };
  return entityMap[code];
}

export const entityToCode = entity => {
  const entityMap = {
    'free': 0,
    'food': 1,
    'energizer': 2,
    'ghost': 3,
    'wall': 4,
    'pacman': 5
  };
  return entityMap[entity]
}

// export const 
