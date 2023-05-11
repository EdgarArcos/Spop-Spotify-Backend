const express = require('express');
const { createSong, getSongs, deleteSongs, updateSongs, getSongId } = require("../controllers/songControllers");

const router = express.Router();

router.get('/', getSongs);
router.post('/', createSong);
router.delete('/:id', deleteSongs);
router.put('/:id', updateSongs);
router.get('/:id', getSongId)

module.exports = router;