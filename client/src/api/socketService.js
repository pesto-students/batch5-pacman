import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:9000/');

const socketConnection = (cb) => {
  socket.on('connected', () => cb());
  socket.emit('connection');
};

export default socketConnection;
