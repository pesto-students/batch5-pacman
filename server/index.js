const express = require('express');
const createError = require('http-errors');
const socketio = require('socket.io');
const http = require('http');
require('dotenv/config');

const app = express();
const server = http.Server(app);
const io = socketio(server);
const config = require('./config/config');
const routes = require('./api/api.js');
const authRoutes = require('./api/auth.js');

require('mongoose').connect(config.db.url, { useNewUrlParser: true });

require('./middleware/appMiddleware')(app);
require('./config/passport');

app.use('/api', routes);
app.use('/', authRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

const connections = [null, null];

io.on('connection', (socket) => {
  let playerIndex = -1;
  connections.forEach((value, index) => {
    if (value === null) {
      playerIndex = index;
    }
  });
  socket.emit('player-number', playerIndex);
  if (playerIndex === -1) return;
  connections[playerIndex] = socket;
  socket.broadcast.emit('player-connect', playerIndex);
  socket.on('actuate', (data) => {
    const { pacman } = data;
    const move = {
      playerIndex,
      pacman,
    };
    socket.on('disconnect', () => {
      connections[playerIndex] = null;
    });
    socket.broadcast.emit('move', move);
  });
});

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Server listening on PORT: ${config.port}`));
