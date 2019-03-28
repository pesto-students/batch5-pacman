import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SERVER_URL);

const socketConnection = (cb) => {
  socket.on('connected', () => cb());
  socket.emit('connection');
};

const joinGame = (playerInfo) => {
  socket.emit('joinGame', playerInfo);
};

const currentGameState = () => {
  socket.on('gameState', (data) => {
    // eslint-disable-next-line no-console
    console.log('Game state:', data);
  });
};

const leaveGame = () => {
  socket.emit('disconnect');
};

export {
  socketConnection,
  joinGame,
  leaveGame,
  currentGameState,
};
