export const getBoard = () => [
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
  [4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4],
  [4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4],
  [4, 1, 4, 4, 1, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 1, 4, 4, 4, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4, 4, 4, 4, 1, 4, 1, 4],
  [4, 1, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4],
  [4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4],
  [4, 1, 4, 1, 1, 1, 1, 1, 4, 4, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 4],
  [4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 4],
  [4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4],
  [4, 1, 4, 4, 4, 4, 1, 4, 4, 1, 4, 4, 4, 4, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4, 4, 4, 4, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 4, 4, 1, 4, 1, 4, 4, 4, 4, 1, 4],
  [4, 1, 4, 4, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4],
  [4, 1, 4, 4, 1, 4, 1, 4, 4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4],
  [4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 4],
  [4, 1, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];

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

export const colorCode = {
  pacman: '#FAD06C',
  food: '#38855d',
  ghost: '#BE2623',
  scatterGhost: '#CCD0D7',
  wall: '#13326D',
  energizer: '#AEE6E6',
};

export const boardCorners = [{ x: 1, y: 1 }, { x: 1, y: 23 }, { x: 23, y: 1 }, { x: 23, y: 23 }];

export const directionValues = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
};

export const getGhosts = () => [[13, 12, 'RIGHT'], [14, 12, 'LEFT'], [11, 12, 'DOWN'], [12, 12, 'UP']];

export const getPacman = () => [13, 14, 'RIGHT'];
