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

require('mongoose').connect(config.db.url, { useNewUrlParser: true });

require('./middleware/appMiddleware')(app);
require('./config/passport');

app.use('/api', routes);
app.use('/', authRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

io.on('connection', (socket) => {
  socket.emit('connected');
});

// eslint-disable-next-line no-console
server.listen(config.port, () => console.log(`Server listening on PORT: ${config.port}`));
