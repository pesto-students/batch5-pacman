import openSocket from 'socket.io-client';
import channels from './constants';

const {
  JOIN_GAME,
  UPDATE_DIRECTION,
  DISCONNECT,
  CONNECTED,
  GAME_UPDATE,
  ROOM_FULL,
} = channels;

const socket = openSocket(process.env.REACT_APP_SERVER_URL);

const createSocketConnection = (cb) => {
  socket.on(CONNECTED, data => cb(data));
  socket.emit('connection');
};

const joinGame = (playerInfo) => {
  socket.emit(JOIN_GAME, playerInfo);
};

const leaveGame = () => {
  socket.emit(DISCONNECT);
};

const getGameUpdate = () => {
  socket.on(GAME_UPDATE, (data) => {
    // eslint-disable-next-line no-console
    console.log('Game state:', data);
  });
};

const foundBothPlayer = (ref) => {
  socket.on(ROOM_FULL, (roomID) => {
    // eslint-disable-next-line no-console
    console.log('room full', roomID);
    ref.setState({ isGameStarted: true });
  });
};

const updateNewDirection = ({ playerId, direction }) => {
  socket.emit(UPDATE_DIRECTION, { playerId, direction });
};

export {
  createSocketConnection,
  joinGame,
  leaveGame,
  getGameUpdate,
  updateNewDirection,
  foundBothPlayer,
};
