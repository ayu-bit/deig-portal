
const { Media, User } = require('../models');
const fs = require('fs');
const path = require('path');

// @desc    Get all media assets
const getAllMedia = async (req, res) => {
  try {
    const media = await Media.findAll({
        order: [['createdAt', 'DESC']],
        include: { model: User, as: 'uploadedBy', attributes: ['name'] }
    });
    // Flatten uploadedBy for frontend compatibility if needed, or update frontend to use object
    const formattedMedia = media.map(m => {
        const json = m.toJSON();
        return {
            ...json,
            uploadedBy: json.uploadedBy ? json.uploadedBy.name : 'Unknown'
        };
    });
    res.status(200).json(formattedMedia);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching media assets', error: error.message });
  }
};

// @desc    Upload a media file
const uploadMedia = async (req, res) => {
  if (req.file) {
    try {
        const baseUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 5001}`;
        const savedMedia = await Media.create({
            name: req.file.originalname,
            fileName: req.file.filename,
            mimeType: req.file.mimetype,
            size: req.file.size,
            url: `${baseUrl}/uploads/${req.file.filename}`,
            type: req.file.mimetype.startsWith('image') ? 'Image' : 'Document', // Simple type check
            uploadedById: req.user.id,
        });
        
        // Format for frontend
        const json = savedMedia.toJSON();
        json.uploadedBy = req.user.name; 
        
        res.status(201).json(json);
    } catch (error) {
        res.status(500).json({ message: 'Error saving media to DB', error: error.message });
    }
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
};

// @desc    Delete one or more media files
const deleteMedia = async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'No media IDs provided' });
    }
  try {
    const mediaFiles = await Media.findAll({ where: { id: ids } });
    
    if (mediaFiles.length > 0) {
        mediaFiles.forEach(file => {
            const filePath = path.join(__dirname, '../../uploads', file.fileName);
            // Check if file exists before trying to unlink
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) console.error(`Failed to delete file: ${filePath}`, err);
                });
            }
        });
        await Media.destroy({ where: { id: ids } });
        res.status(200).json({ message: `${mediaFiles.length} media asset(s) deleted successfully` });
    } else {
        res.status(404).json({ message: 'No media assets found for the given IDs' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting media assets', error: error.message });
  }
};

module.exports = {
  getAllMedia,
  uploadMedia,
  deleteMedia,
};
