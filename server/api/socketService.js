const { createRoom, currentGameState, startGame } = require('./game/controller');

const games = {};
const socketService = (socket) => {
  socket.on('joinGame', (playerInfo) => {
    const availableGame = Object.values(games);
    const openGame = availableGame.find(game => game.freeToJoin === true);
    if (openGame) {
      openGame.pacmanTwo = playerInfo;
      openGame.freeToJoin = false;
      // eslint-disable-next-line no-param-reassign
      socket.room = openGame.roomId;
      socket.join(openGame.roomId);
    } else {
      const newGame = createRoom(playerInfo, socket);
      games.roomId = newGame;
      // eslint-disable-next-line no-param-reassign
      socket.room = newGame.roomId;
      socket.join(newGame.roomId);
    }
    // eslint-disable-next-line no-param-reassign
    socket.interval = setInterval(() => {
      // eslint-disable-next-line no-undef
      io.in(socket.room).emit('gameState', currentGameState());
    }, 500);
  });

  socket.on('startGame', startGame);


  socket.on('disconnect', () => {
    clearInterval(socket.interval);
    delete games[socket.room];
    socket.leave(socket.room);
  });

  socket.emit('connected');
};

module.exports = socketService;
