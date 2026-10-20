const express = require('express');
const router = express.Router();
const {
  getAllMedia,
  uploadMedia,
  deleteMedia,
} = require('../controllers/mediaController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');
const { upload } = require('../services/mediaService');

router.route('/')
  .get(protect, checkPermissions(['media:view']), getAllMedia)
  .post(protect, checkPermissions(['media:upload']), upload.single('file'), uploadMedia);

router.delete('/:id', protect, checkPermissions(['media:delete']), deleteMedia);

module.exports = router;
