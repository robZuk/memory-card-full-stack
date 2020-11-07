const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },

  cards: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
});

module.exports = Category = mongoose.model('category', CategorySchema);
