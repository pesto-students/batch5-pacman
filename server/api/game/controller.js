import uuidv1 from 'uuid/v1';
import {
  boardCorners,
  refreshRate,
  getGhosts,
} from './constants';
import {
  getRandomAdjacentAvailableCell,
  getGridwithWeights,
  chaseLocation,
  initSquareGridState,
} from './core';

const gameState = {
  moveGhostsCount: 0,
  scatterGhostspath: [],
  scatterStart: 75,
  pacmanOne: {},
  pacmanTwo: {},
  gridState: [],
};

const setInitialGameState = () => {
  const gridState = initSquareGridState();
  const ghostsArray = getGhosts().map(([x, y, direction]) => ({
    x, y, direction,
  }));
  gameState.gridState = gridState;
  gameState.ghosts = ghostsArray;
};

export const createRoom = (playerInfo, socket) => {
  gameState.pacmanOne = playerInfo;
  gameState.socket = socket;
  gameState.roomId = uuidv1();
  gameState.freeToJoin = true;
  return gameState;
};

const currentGameState = () => {
  const { socket, ...rest } = gameState;
  return rest;
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
    ghosts, gridState, scatterStart,
  } = gameState;
  const { ghostsUpdated, moveGhostsCount } = moveGhosts(
    { ghosts, gridState, scatterStart },
  );
  gameState.moveGhostsCount = moveGhostsCount;
  gameState.ghosts = ghostsUpdated;
};

export const startGame = () => {
  setInitialGameState();
  setTimeout(() => {
    const { socket } = gameState;
    // eslint-disable-next-line no-console
    console.log('Game started after 3 seconds');
    socket.interval = setInterval(() => {
      calculateNextGameState();
      // eslint-disable-next-line no-undef
      io.in(socket.room).emit('gameState', currentGameState());
    }, refreshRate);
  }, 3000);
};
