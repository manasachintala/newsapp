const express=require('express');
const router = express.Router();
const Article = require('../models/Article');

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific article
router.get('/:id', async (req, res) => {
  try {
    const articles = await Article.findById(req.params.id);
    if (!articles) return res.status(404).json({ message: 'Article not found' });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new article
router.post('/', async (req, res) => {
  const articles = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newArticle = await articles.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an article
router.delete('/:id', async (req, res) => {
  try {
    const articles = await Article.findByIdAndDelete(req.params.id);
    if (!articles) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE an article
router.put('/:id', async (req, res) => {
  try {
    const articles = await Article.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!articles) return res.status(404).json({ message: 'Article not found' });
    res.json(articles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;