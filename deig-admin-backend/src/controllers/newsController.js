
const { News, User } = require('../models');

// @desc    Get all news articles
const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({
        order: [['date', 'DESC']],
        include: { model: User, as: 'author', attributes: ['name'] }
    });
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: 'Server error fetching news articles', error: error.message });
  }
};

// @desc    Get single news article
const getNewsById = async (req, res) => {
  try {
    const article = await News.findByPk(req.params.id, {
        include: { model: User, as: 'author', attributes: ['name'] }
    });
    if (article) {
        res.status(200).json(article);
    } else {
        res.status(404).json({ message: 'News article not found' });
    }
  } catch (error) {
    console.error("Error fetching news detail:", error);
    res.status(500).json({ message: 'Server error fetching news article', error: error.message });
  }
};

// @desc    Create a news article
const createNews = async (req, res) => {
  const { title, titleAm, excerpt, excerptAm, content, contentAm, imageUrl, category, date } = req.body;
  try {
    const newArticle = await News.create({
        title,
        titleAm,
        excerpt,
        excerptAm,
        content,
        contentAm,
        imageUrl,
        category,
        date: date || new Date(),
        status: 'Draft',
        authorId: req.user.id,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ message: 'Server error creating news article', error: error.message });
  }
};

// @desc    Update a news article
const updateNews = async (req, res) => {
    try {
        const article = await News.findByPk(req.params.id);
        if (article) {
            await article.update(req.body);
            res.status(200).json(article);
        } else {
            res.status(404).json({ message: 'News article not found' });
        }
    } catch (error) {
        console.error("Error updating news:", error);
        res.status(500).json({ message: 'Server error updating news article', error: error.message });
    }
};

// @desc    Delete a news article
const deleteNews = async (req, res) => {
    try {
        const article = await News.findByPk(req.params.id);
        if (article) {
            await article.destroy();
            res.status(200).json({ message: 'News article removed' });
        } else {
            res.status(404).json({ message: 'News article not found' });
        }
    } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({ message: 'Server error deleting news article', error: error.message });
    }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
