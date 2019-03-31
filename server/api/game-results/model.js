import mongoose, { Schema } from 'mongoose';

const GameResultsSchema = new Schema({
  player1: {
    type: Schema.Types.Mixed,
    required: true,
  },
  player2: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model('GameResult', GameResultsSchema);
