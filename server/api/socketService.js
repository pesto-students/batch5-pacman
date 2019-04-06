import logger from '../utils/logger';
import {
  JOIN_GAME,
  UPDATE_DIRECTION,
  GAME_END,
  DISCONNECT,
  CONNECTED,
  ROOM_FULL,
  ROOM_CREATED,
} from './channels';
import gameResultsController from './game-results/controller';

import Game from './game/controller';

const games = {};

const socketService = (socket) => {
  socket.on(JOIN_GAME, ({ playerId }) => {
    let roomId;
    const gameList = Object.values(games);
    const availableRoom = gameList.find(game => game.available);
    if (availableRoom) {
      // eslint-disable-next-line prefer-destructuring
      availableRoom.gameState.players[playerId] = {};
      availableRoom.available = false;
      // eslint-disable-next-line no-param-reassign
      socket.room = availableRoom.roomId;
      socket.join(availableRoom.roomId);
      logger('Joined room', socket.room);
      availableRoom.startGame();
      // eslint-disable-next-line no-undef
      io.in(socket.room).emit(ROOM_FULL, socket.room);
    } else {
      const newGame = new Game({ playerId, socket });
      // eslint-disable-next-line prefer-destructuring
      roomId = newGame.roomId;
      games[roomId] = newGame;
      // eslint-disable-next-line no-param-reassign
      socket.room = newGame.roomId;
      socket.join(newGame.roomId);
      logger('Created new room', newGame.roomId);
      logger('Current games object: ', Object.entries(games));
      socket.emit(ROOM_CREATED, roomId);
    }
    socket.emit(CONNECTED, socket.room);
    socket.on(UPDATE_DIRECTION, games[socket.room].updateDirection);
  });

  socket.on(GAME_END, () => {
    const gameResult = games[socket.room].getGameResult();
    gameResultsController.saveGame(gameResult);
    delete games[socket.room];
    socket.leave(socket.room);
    games[socket.room].endGame();
  });

  socket.on(DISCONNECT, () => {
    delete games[socket.room];
    socket.leave(socket.room);
  });
};

export default socketService;
