import openSocket from 'socket.io-client';
import channels from './constants';
import { getBoard } from '../components/PacmanGame/constants';

const {
  JOIN_GAME,
  UPDATE_DIRECTION,
  DISCONNECT,
  CONNECTED,
  GAME_UPDATE,
  ROOM_FULL,
  ROOM_CREATED,
  GAME_OVER,
  PING,
} = channels;

const socket = openSocket(process.env.REACT_APP_SERVER_URL);

const createSocketConnection = (cb) => {
  socket.on(CONNECTED, data => cb(data));
  // eslint-disable-next-line no-console
  socket.on(ROOM_CREATED, data => console.log('New Room Created', data));
  socket.emit('connection');
};

const joinGame = (playerInfo) => {
  socket.emit(JOIN_GAME, playerInfo);
};

const leaveGame = () => {
  socket.emit(DISCONNECT);
};

const foundBothPlayer = (ref) => {
  socket.on(ROOM_FULL, (roomID) => {
    // eslint-disable-next-line no-console
    console.log('room full', roomID);
    ref.setState({ isGameStarted: true, isGameEnd: false, isMulti: true });
  });
};

const findClientToServerLatencyTime = ({ playerId = 0 }) => {
  socket.emit(PING, { playerId, clientTime: new Date().getTime(), dummyData: getBoard() });
};

const getGameUpdate = (cb) => {
  const getConstantLatencyLogs = true;
  socket.on(GAME_UPDATE, (newState) => {
    if (getConstantLatencyLogs) {
      findClientToServerLatencyTime({ clientTime: new Date().getTime() });
    }
    cb({ newState });
  });
};

const gameOver = (context) => {
  socket.on(GAME_OVER, (newState) => {
    const { playerId } = context;
    const { players } = newState;
    const newScore = players[playerId].score;
    context.setScore(newScore);
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
  foundBothPlayer,
  updateNewDirection,
  gameOver,
  findClientToServerLatencyTime,
};
