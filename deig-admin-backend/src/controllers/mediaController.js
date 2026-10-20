
const { Media } = require('../models');
const mediaService = require('../services/mediaService');

exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        const result = await mediaService.handleFileUpload(req.file, req.user);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file.', error: error.message });
    }
};

exports.getAllMedia = async (req, res) => {
    try {
        const mediaFiles = await Media.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(mediaFiles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media files.', error: error.message });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const mediaFile = await Media.findByPk(req.params.id);
        if (!mediaFile) {
            return res.status(404).json({ message: 'Media file not found.' });
        }
        
        await mediaService.handleFileDelete(mediaFile);
        
        res.json({ message: 'Media file deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media file.', error: error.message });
    }
};
