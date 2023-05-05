const express = require('express');
const { createPlaylist, addToPlaylist } = require ("../controllers/playlistControllers");

const router = express.Router();


router.post('/add', createPlaylist);
router.post("/:id/songs", addToPlaylist)


module.exports = router;
