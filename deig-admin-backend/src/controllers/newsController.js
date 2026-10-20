
const { News, User } = require('../models');

// Placeholder for all CRUD operations

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({
            include: { model: User, as: 'author', attributes: ['name'] },
            order: [['date', 'DESC']]
        });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news", error: error.message });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const article = await News.findByPk(req.params.id, {
             include: { model: User, as: 'author', attributes: ['name'] }
        });
        if (!article) return res.status(404).json({ message: "News article not found" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news article", error: error.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        // Extract image from request body along with other fields
        const { title, content, date, category, status, image } = req.body;
        const newArticle = await News.create({
            title,
            content,
            date,
            category,
            status,
            image, // Save the image URL to the database
            authorId: req.user.id
        });
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: "Error creating news article", error: error.message });
    }
};

exports.updateNews = async (req, res) => {
     try {
        const article = await News.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "News article not found" });
        // req.body includes 'image' if it was updated, which update() handles automatically
        await article.update(req.body);
        res.json({ message: "News article updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating news article", error: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const article = await News.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: "News article not found" });
        await article.destroy();
        res.json({ message: "News article deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting news article", error: error.message });
    }
};
