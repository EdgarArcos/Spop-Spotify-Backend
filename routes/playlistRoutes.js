const express = require('express');
const { createPlaylist } = require ("../controllers/playlistControllers");

const router = express.Router();


router.post('/add', createPlaylist);


module.exports = router;
