const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Card = require('../../models/Card');
const User = require('../../models/User');

// @route  POST api/cards
// @desc  Create a card
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('question', 'Question is required').not().isEmpty(),
      check('answer', 'Answer is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newCard = new Card({
        question: req.body.question,
        answer: req.body.answer,
        name: user.name,
        user: req.user.id,
      });

      const card = await newCard.save();
      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/cards
// @desc Get all cards by user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id }).sort({ date: -1 });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/cards
// @desc Delete all cards
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    const cards = await Card.deleteMany({ user: req.user.id }).sort();
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/card/:id
// @desc Get card by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }
    res.json(card);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Card not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/card/:id
// @desc Get all posts
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    //     //Check user
    if (card.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await card.remove();

    res.json({ msg: 'Card removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Card not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
