const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Category = require('../../models/Category');
const User = require('../../models/User');

// @route  POST api/categories
// @desc  Create a category
// @access Private

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newCategory = new Category({
        name: req.body.name,
        description: req.body.description,
        userName: user.name,
        user: req.user.id,
      });

      const category = await newCategory.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  PUT api/categories
// @desc  Update a category by id
// @access Private

router.put(
  '/:id',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const category = await Category.findById(req.params.id);
      //Check user
      if (category.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const { name, description } = req.body;

      if (name) category.name = name;
      if (description) category.description = description;

      const updadeCategory = await category.save();

      res.json(updadeCategory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/categories
// @desc Get all user categories
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/categories/:id
// @desc Get category by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    //Check user
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(category.cards);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/categories/:id
// @desc Delete categories by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    //Check user
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await category.remove();

    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  POST api/categories/card/:id
// @desc Card on a category
// @access Private

router.post(
  '/card/:id',
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
      const category = await Category.findById(req.params.id);

      const newCard = {
        question: req.body.question,
        answer: req.body.answer,
        name: user.name,
        user: req.user.id,
      };

      category.cards.unshift(newCard);

      await category.save();
      res.json(category.cards);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/categories/card/:id/:card_id
// @desc Delete card
// @access Private

router.delete('/card/:id/:card_id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    //Pull out card
    const card = category.cards.find((card) => card.id === req.params.card_id);

    //Make sure card exists
    if (!card) {
      return res.status(404).json({ msg: 'Card does not exist' });
    }

    //Check user
    if (card.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    category.cards = category.cards.filter(
      ({ id }) => id !== req.params.card_id
    );

    await category.save();

    res.json(category.cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
