import logger from '../utils/logger';

const { createRoom, startGame } = require('./game/controller');

const games = [];
// const findGameById = (id) => {
//   const availableGame = Object.values(games);
//   return availableGame.find(game => game.roomId === id);
// };

const socketService = (socket) => {
  socket.on('joinGame', (playerInfo) => {
    let roomId;
    const availableGames = games.filter(game => game.available)[0];
    if (availableGames) {
      // eslint-disable-next-line prefer-destructuring
      roomId = availableGames.roomId;
      availableGames.pacmanTwo = playerInfo;
      availableGames.available = false;
      // eslint-disable-next-line no-param-reassign
      socket.room = availableGames.roomId;
      socket.join(availableGames.roomId);
      startGame();
      logger('Joined room', socket.room);
    } else {
      const newGame = createRoom(playerInfo, socket);
      // eslint-disable-next-line prefer-destructuring
      roomId = newGame.roomId;
      games[newGame.roomId] = newGame;
      // eslint-disable-next-line no-param-reassign
      socket.room = newGame.roomId;
      socket.join(newGame.roomId);
      logger('Created new room');
    }
    socket.emit('connected', roomId);
  });

  socket.on('disconnect', () => {
    clearInterval(socket.interval);
    // delete games[socket.room];
    socket.leave(socket.room);
  });
  socket.on('update-game-state', (info) => {
    // Find game by room-id
    // Update pacman position, food & score
    // Send the info back to clients in that room
    socket.emit('update-game', info);
  });
};

export default socketService;
