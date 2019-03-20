import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:9000/');

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
