const express = require('express');
const createError = require('http-errors');
require('dotenv/config');

const app = express();

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

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Server listening on PORT: ${config.port}`));
