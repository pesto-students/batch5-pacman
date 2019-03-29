import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SERVER_URL);

const createSocketConnection = (cb) => {
  socket.on('connected', data => cb(data));
  socket.emit('connection');
};

const joinGame = (playerInfo) => {
  socket.emit('joinGame', playerInfo);
};

const getCurrentGameState = () => {
  socket.on('gameState', (data) => {
    // eslint-disable-next-line no-console
    console.log('Game state:', data);
  });
};

const leaveGame = () => {
  socket.emit('disconnect');
};

const updateGameState = ({ pacman, roomId, playerId }) => {
  socket.emit('update-game-state',
    { ...pacman, roomId, playerId });
};

const getGameUpdate = (cb) => {
  socket.on('game-update', cb);
};

export {
  createSocketConnection,
  joinGame,
  leaveGame,
  getCurrentGameState,
  updateGameState,
  getGameUpdate,
};
