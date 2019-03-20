const express = require('express');
const createError = require('http-errors');
const socketIo = require('socket.io');
const http = require('http');
require('dotenv/config');

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const config = require('./config/config');
const routes = require('./api/api.js');
const authRoutes = require('./api/auth.js');
const gameController = require('./api/gameController');

require('mongoose').connect(config.db.url, { useNewUrlParser: true });

require('./middleware/appMiddleware')(app);
require('./config/passport');

app.use('/api', routes);
app.use('/', authRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

const games = {};

io.on('connection', (socket) => {
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
});

// eslint-disable-next-line no-console
server.listen(config.port, () => console.log(`Server listening on PORT: ${config.port}`));
