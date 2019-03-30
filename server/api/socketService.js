import logger from '../utils/logger';

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

  socket.on('disconnect', () => {
    clearInterval(socket.interval);
    delete games[socket.room];
    socket.leave(socket.room);
  });
  // socket.on('update-game-state', ({ pacman, playerId, roomId }) => {
  //   const room = games[roomId];
  //   console.log(room.pacmanOne.playerId);
  //   const player = room.pacmanOne.playerId === playerId ? 'pacmanOne' : 'pacmanTwo';
  //   room[player] = pacman;
  //   games[roomId] = room;
  //   socket.emit('game-update', { pacmanOne: room.pacmanOne, pacmanTwo: room.pacmanTwo });
  // });
};

export default socketService;
