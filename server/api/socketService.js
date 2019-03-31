import logger from '../utils/logger';

const gameResultsController = require('./game-results/controller');

const { createRoom, startGame } = require('./game/controller');

const games = {};

const socketService = (socket) => {
  socket.on('joinGame', (playerInfo) => {
    let roomId;
    const gameList = Object.values(games);
    const availableRoom = gameList.find(game => game.available);
    if (availableRoom) {
      // eslint-disable-next-line prefer-destructuring
      roomId = availableRoom.roomId;
      availableRoom.pacmanTwo = playerInfo;
      availableRoom.available = false;
      games[roomId] = availableRoom;
      // eslint-disable-next-line no-param-reassign
      socket.room = availableRoom.roomId;
      socket.join(availableRoom.roomId);
      startGame();
      logger('Joined room', socket.room);
    } else {
      const newGame = createRoom(playerInfo, socket);
      // eslint-disable-next-line prefer-destructuring
      roomId = newGame.roomId;
      games[roomId] = newGame;
      // eslint-disable-next-line no-param-reassign
      socket.room = newGame.roomId;
      socket.join(newGame.roomId);
      logger('Created new room');
    }
    socket.emit('connected', roomId);
  });

  socket.on('game-end', (roomId) => {
    const game = games[roomId];
    const player1 = { username: game.pacmanOne.username, score: game.pacmanOne.score };
    const player2 = { username: game.pacmanTwo.username, score: game.pacmanTwo.score };
    gameResultsController.saveGame({ player1, player2 });
    delete games[roomId];
    clearInterval(socket.interval);
  });

  socket.on('disconnect', () => {
    clearInterval(socket.interval);
    delete games[socket.room];
    socket.leave(socket.room);
  });
};

export default socketService;
