
const { Page, User } = require('../models');

const getAllPages = async (req, res) => {
    try {
        const pages = await Page.findAll({
            include: { model: User, as: 'editedBy', attributes: ['name'] }
        });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createPage = async (req, res) => {
    try {
        const savedPage = await Page.create({ ...req.body, editedById: req.user.id });
        res.status(201).json(savedPage);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updatePage = async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id);
        if (page) {
            await page.update({
                ...req.body,
                editedById: req.user.id,
                lastEdited: new Date()
            });
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deletePage = async (req, res) => {
    try {
        const page = await Page.findByPk(req.params.id);
        if (page) {
            await page.destroy();
            res.status(200).json({ message: 'Page removed' });
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllPages, createPage, updatePage, deletePage };
