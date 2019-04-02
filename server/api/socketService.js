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
  socket.on(JOIN_GAME, (playerInfo) => {
    let roomId;
    const gameList = Object.values(games);
    const availableRoom = gameList.find(game => game.available);
    if (availableRoom) {
      // eslint-disable-next-line prefer-destructuring
      availableRoom.pacmanTwo = playerInfo;
      availableRoom.available = false;
      // eslint-disable-next-line no-param-reassign
      socket.room = availableRoom.roomId;
      socket.join(availableRoom.roomId);
      availableRoom.startGame();
      logger('Joined room', socket.room);
      global.io.to(roomId).emit(ROOM_FULL, roomId);
    } else {
      const newGame = new Game(playerInfo, socket);
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
    socket.emit(CONNECTED, roomId);
    socket.on(UPDATE_DIRECTION, games[socket.room].updateDirection);
  });


  socket.on(GAME_END, (roomId) => {
    const game = games[roomId];
    const player1 = { username: game.pacmanOne.username, score: game.pacmanOne.score };
    const player2 = { username: game.pacmanTwo.username, score: game.pacmanTwo.score };
    gameResultsController.saveGame({ player1, player2 });
    delete games[roomId];
    games[socket.room].endGame();
  });

  socket.on(DISCONNECT, () => {
    delete games[socket.room];
    socket.leave(socket.room);
  });
};

export default socketService;
