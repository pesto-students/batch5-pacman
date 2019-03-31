import logger from '../../utils/logger';

const GameResult = require('./model');

exports.saveGame = (game) => {
  GameResult.create(game)
    .then(() => {
      logger('Game saved');
    })
    .catch(() => logger('error'));
};
