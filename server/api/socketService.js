const gameController = require('./gameController');

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
      const newGame = gameController(playerInfo);
      games.roomId = newGame;
      // eslint-disable-next-line no-param-reassign
      socket.room = newGame.roomId;
      socket.join(newGame.roomId);
    }
  });

  socket.on('disconnect', () => {
    delete games[socket.room];
    socket.leave(socket.room);
  });

  socket.emit('connected');
};

module.exports = socketService;
