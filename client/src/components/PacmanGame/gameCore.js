export const initGridState = (rows, cols) => {
  // const column = new Array(cols).fill(0);
  // return new Array(rows).fill(column);
  return Array(rows).fill().map(() => Array(cols).fill(0))
};




export const getFoods = () => [[15, 9], [14, 9], [13, 9], [12, 9], [11, 9], [10, 9]];

const wallGenerator = numberofCells => {
  const wall = [];
  const int = num => parseInt(num, 10);

  for (let col = 0; col < numberofCells; col++) {
    const topRow = [col, 0];
    const bottomRow = [col, numberofCells - 1];
    if (col % 2 === 0) {
      const middleRow = [col, int((numberofCells - 1) / 2)];
      wall.push(middleRow);
    }
    wall.push(topRow);
    wall.push(bottomRow);
  }
  for (let row = 0; row < numberofCells; row++) {
    const leftCol = [0, row];
    const rightCol = [numberofCells - 1, row];
    if (row % 2 === 0) {
      const middleRow = [int((numberofCells - 1) / 2), row];
      wall.push(middleRow);
    }
    wall.push(leftCol);
    wall.push(rightCol);
  }
  return wall;
};

export const getWalls = (cellsInEachRow) => wallGenerator(cellsInEachRow);

export const getEnergizers = () => [[4, 6], [9, 1], [1, 9], [13, 13]];

export const getGhosts = () => [[23, 5], [19, 1], [1, 19], [1, 13]];

export const getPacman = () => [[43, 5]];

export const entityApplier = (gridState, entityLocations, entityCode) => {
  for (const [x, y] of entityLocations) {
    gridState[x][y] = entityCode;
  }
  // return gridState;
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
