const express = require('express');
const app = express();

const config = require('./config/config');
const routes = require('./api/api.js');

require('mongoose').connect(config.db.url, { useNewUrlParser: true });

require('./middleware/appMiddleware')(app);

app.use('/api', routes);

app.listen(config.port, () => console.log(`Server listening on PORT: ${config.port}`));
