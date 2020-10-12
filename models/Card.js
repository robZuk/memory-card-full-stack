const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = Card = mongoose.model('card', CardSchema);
