
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mediaController = require('../controllers/mediaController');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Multer config for file uploads with extension preservation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const canManageMedia = checkRole(['Admin', 'Editor']);

router.use(verifyToken, canManageMedia);

// @route   POST /api/v1/media/upload
// @desc    Upload a single file
router.post('/upload', upload.single('file'), logAction('Upload Media'), mediaController.uploadFile);

// @route   GET /api/v1/media
// @desc    Get all media files
router.get('/', mediaController.getAllMedia);

// @route   DELETE /api/v1/media/:id
// @desc    Delete a media file
router.delete('/:id', logAction('Delete Media'), mediaController.deleteMedia);

module.exports = router;
