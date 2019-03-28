import express from 'express';
import createError from 'http-errors';
import http from 'http';
import socketIo from 'socket.io';
import mongoose from 'mongoose';
import {} from 'dotenv/config';
import config from './config/config';
import routes from './api/api';
import authRoutes from './api/auth';
import socketService from './api/socketService';
import middleware from './middleware/appMiddleware';
import './config/passport';

const app = express();
const server = http.Server(app);
global.io = socketIo(server);

mongoose.connect(config.db.url, { useNewUrlParser: true });
middleware(app);

app.use('/api', routes);
app.use('/', authRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-undef
io.on('connection', socketService);

// eslint-disable-next-line no-console
server.listen(config.port, () => console.log(`Server listening on PORT: ${config.port}`));
