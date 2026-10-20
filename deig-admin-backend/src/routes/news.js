
const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.route('/')
  .get(getAllNews) // Public for frontend
  .post(protect, checkPermissions(['news:create']), createNews);

router.route('/:id')
  .get(getNewsById) // Public for frontend
  .put(protect, checkPermissions(['news:edit']), updateNews)
  .delete(protect, checkPermissions(['news:delete']), deleteNews);

module.exports = router;
