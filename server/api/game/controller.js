import uuidv1 from 'uuid/v1';
import {
  boardCorners,
  refreshRate,
  getGhosts,
  getPacman,
  codeToEntity,
  entityToCode,
} from './constants';
import {
  getRandomAdjacentAvailableCell,
  getGridwithWeights,
  chaseLocation,
  moveInDirection,
  isWall,
  initSquareGridState,
} from './core';

const gameState = {
  moveGhostsCount: 0,
  scatterGhostspath: [],
  scatterStart: 75,
  pacmanOne: {},
  pacmanTwo: {},
  gridState: [],
  status: 0,
};

const setInitialGameState = () => {
  const { pacmanOne, pacmanTwo } = gameState;
  const gridState = initSquareGridState();
  const ghostsArray = getGhosts().map(([x, y, direction]) => ({
    x, y, direction,
  }));
  gameState.gridState = gridState;
  gameState.ghosts = ghostsArray;
  gameState.pacmanOne = { ...pacmanOne, ...getPacman() };
  gameState.pacmanTwo = { ...pacmanTwo, ...getPacman() };
};

export const createRoom = (playerInfo, socket) => {
  gameState.pacmanOne = playerInfo;
  gameState.socket = socket;
  gameState.roomId = uuidv1();
  gameState.available = true;
  return gameState;
};

const currentGameState = () => {
  const { socket, ...rest } = gameState;
  return rest;
};

const endGame = () => {
  clearInterval(gameState.interval);
};

const eatFood = ({ pacman: newLocation }) => {
  const { gridState } = gameState;
  const entityInCell = codeToEntity(gridState[newLocation.x][newLocation.y]);
  let { score } = newLocation;
  if (entityInCell === 'food') {
    score += 1;
  } else if (entityInCell === 'energizer') {
    score += 5;
  }
  gridState[newLocation.x][newLocation.y] = entityToCode('free');
  gameState.gridState = gridState;
  return { score };
};

const ifAtGhosts = ({ ghosts, pacman }) => {
  const isAtSameLocation = (
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ) => (x1 === x2) && (y1 === y2);

  const ispacmanDead = ghosts
    .some(ghost => isAtSameLocation(ghost, pacman));

  return ispacmanDead;
};

const dieIfOnGhost = ({ ghosts, pacman }) => {
  if (ifAtGhosts({ ghosts, pacman })) {
    gameState.status = 2;
    endGame();
    return true;
  }
  return false;
};

const movePacman = ({ pacman, ghostsUpdated, gridState }) => {
  const { x, y, direction } = pacman;

  const pacmanDead = dieIfOnGhost({ ghosts: ghostsUpdated, pacman });

  if (pacmanDead) {
    return {
      pacmanUpdated: pacman,
    };
  }

  let newLocation = moveInDirection({ x, y, direction });

  newLocation = isWall(gridState, newLocation) ? {} : moveInDirection({ x, y, direction });
  return {
    pacmanUpdated: { ...pacman, ...newLocation },
  };
};

const addPositionsToArray = (arr, index) => {
  const scatterTime = 55;
  if (arr.length < scatterTime) {
    arr.push(boardCorners[index]);
    return addPositionsToArray(arr, index);
  }
  return arr;
};

const moveGhosts = ({ ghosts, gridState, scatterStart }) => {
  let { moveGhostsCount, scatterGhostspath } = gameState;
  moveGhostsCount += 1;
  const scatterEnd = scatterStart + 55;
  if (moveGhostsCount === scatterStart) {
    const gridWithWeights = getGridwithWeights(gridState);
    const ghostsPath = ghosts
      .map((ghost, index) => chaseLocation(gridWithWeights, ghost, boardCorners[index]))
      .map(postion => postion.map(arr => ({ x: arr[0], y: arr[1] })));

    scatterGhostspath = ghostsPath
      .map((array, index) => addPositionsToArray(array, index));
    gameState.scatterGhostspath = scatterGhostspath;
  }

  if (moveGhostsCount === scatterEnd) {
    const ghostsUpdated = [
      { x: 1, y: 1, direction: 'LEFT' },
      { x: 23, y: 1, direction: 'LEFT' },
      { x: 1, y: 23, direction: 'LEFT' },
      { x: 23, y: 23, direction: 'LEFT' }];
    return {
      ghostsUpdated, moveGhostsCount,
    };
  }

  if (moveGhostsCount > (scatterStart + 1) && moveGhostsCount < scatterEnd) {
    const ghostsUpdated = scatterGhostspath.map(path => path[moveGhostsCount - scatterStart]);
    return {
      ghostsUpdated, moveGhostsCount,
    };
  }

  const ghostsUpdated = ghosts.map(
    ({ x, y, direction }) => getRandomAdjacentAvailableCell(gridState, { x, y, direction }),
  );
  return {
    ghostsUpdated, moveGhostsCount,
  };
};

const calculateNextGameState = () => {
  const {
    ghosts, gridState, scatterStart, pacmanOne, pacmanTwo,
  } = gameState;
  const { ghostsUpdated, moveGhostsCount } = moveGhosts({ ghosts, gridState, scatterStart });
  const { pacmanUpdated: newPacmanOne } = movePacman({
    pacman: pacmanOne, ghostsUpdated, gridState,
  });
  const { pacmanUpdated: newPacmanTwo } = movePacman({
    pacman: pacmanTwo, ghostsUpdated, gridState,
  });

  dieIfOnGhost({ ghosts: ghostsUpdated, pacman: newPacmanOne });
  dieIfOnGhost({ ghosts: ghostsUpdated, pacman: newPacmanTwo });

  const {
    score: pacmanOneScore,
  } = eatFood({ pacman: pacmanOne, gridStateAfterPacmanMove: gridState });
  const {
    score: pacmanTwoScore,
  } = eatFood({ pacman: pacmanTwo, gridStateAfterPacmanMove: gridState });
  gameState.pacmanOne = { ...pacmanOne, ...newPacmanOne, score: pacmanOneScore };
  gameState.pacmanTwo = { ...pacmanTwo, ...newPacmanTwo, score: pacmanTwoScore };
  gameState.moveGhostsCount = moveGhostsCount;
  gameState.ghosts = ghostsUpdated;
};

export const updateDirection = ({ playerId, direction }) => {
  const { pacmanOne, pacmanTwo } = gameState;
  if (pacmanOne.playerId === playerId) {
    gameState.pacmanOne.direction = direction;
  }
  if (pacmanTwo.playerId === playerId) {
    gameState.pacmanTwo.direction = direction;
  }
};

export const startGame = () => {
  setInitialGameState();
  setTimeout(() => {
    const { socket } = gameState;
    // eslint-disable-next-line no-console
    console.log('Game started after 3 seconds');
    gameState.interval = setInterval(() => {
      calculateNextGameState();
      // eslint-disable-next-line no-undef
      io.in(socket.room).emit('game-update', currentGameState());
    }, refreshRate);
  }, 3000);
};
