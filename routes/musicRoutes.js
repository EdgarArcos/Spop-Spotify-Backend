const express = require('express');
const {
  getAllGenres,
  getSongsByGenre,
  handleLikeSong,
  handleDragAndDrop,
} = require('../controllers/musicControllers');

const router = express.Router();

router.get('/genres', getAllGenres);
router.get('/:genre', getSongsByGenre);
router.post('/handlelikesong', handleLikeSong);
router.post('/dragAndDrop', handleDragAndDrop);

module.exports = router;
