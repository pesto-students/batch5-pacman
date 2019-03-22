import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SERVER_URL);

const socketConnection = (cb) => {
  socket.on('connected', () => cb());
  socket.emit('connection');
};

const joinGame = (playerInfo) => {
  socket.emit('joinGame', playerInfo);
};

const leaveGame = () => {
  socket.emit('disconnect');
};

export { socketConnection, joinGame, leaveGame };
