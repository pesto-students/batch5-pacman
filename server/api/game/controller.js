const uuidv1 = require('uuid/v1');
const {
  boardCorners,
  refreshRate,
} = require('./constants');
const {
  getRandomAdjacentAvailableCell,
  getGridwithWeights,
  chaseLocation,
} = require('./core');

const gameState = {
  moveGhostsCount: 0,
  scatterGhostspath: [],
  scatterStart: 75,
  pacmanOne: {},
  pacmanTwo: {},
  interval: null,
};


const createRoom = (playerInfo, socket) => {
  gameState.pacmanOne = playerInfo;
  gameState.socket = socket;
  gameState.roomId = uuidv1();
  gameState.freeToJoin = true;
  return gameState;
};

const currentGameState = () => {
  const { socket, ...rest } = gameState;
  socket.emit('gameState', rest);
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
      .map((array, index) => this.addPositionsToArray(array, index));
    this.setState({
      scatterGhostspath,
    });
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

const animateGame = () => {
  try {
    const {
      ghosts, gridState, scatterStart,
    } = gameState;
    const { ghostsUpdated, moveGhostsCount } = moveGhosts(
      { ghosts, gridState, scatterStart },
    );
    gameState.moveGhostsCount = moveGhostsCount;
    gameState.ghosts = ghostsUpdated;
  } catch (e) {
    clearInterval(gameState.interval);
  }
};

const startGame = () => {
  gameState.interval = setInterval(() => animateGame(), refreshRate);
};

module.exports = { createRoom, currentGameState, startGame };
