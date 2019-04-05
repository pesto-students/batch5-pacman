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

export const boardTranspose = getBoard()[0].map((col, i) => getBoard().map(row => row[i]));


const framesPerSecond = 3;

export const advanceFrameAfterTime = 1000 / framesPerSecond;

export const directionValues = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
};

export const getGhosts = () => [[13, 12, 'RIGHT'], [14, 12, 'LEFT'], [11, 12, 'DOWN'], [12, 12, 'UP']];

export const boardCorners = [{ x: 1, y: 1 }, { x: 1, y: 23 }, { x: 23, y: 1 }, { x: 23, y: 23 }];

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

export const getPacmans = () => ([
  {
    x: 13, y: 14, direction: 'RIGHT', score: 0, alive: true,
  },
  {
    x: 12, y: 14, direction: 'RIGHT', score: 0, alive: true,
  },
]);

export const newGhostValues = [
  { x: 1, y: 1, direction: 'LEFT' },
  { x: 23, y: 1, direction: 'LEFT' },
  { x: 1, y: 23, direction: 'LEFT' },
  { x: 23, y: 23, direction: 'LEFT' }];
