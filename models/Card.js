const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

module.exports = Card = mongoose.model('card', CardSchema);
