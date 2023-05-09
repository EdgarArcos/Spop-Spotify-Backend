const express = require('express');
const { createPlaylist, addToPlaylist, editPlaylistTitle, deletePlaylist, editPlaylistImage } = require ("../controllers/playlistControllers");

const router = express.Router();


router.post('/add', createPlaylist);
router.post("/:id/songs", addToPlaylist);
router.put("/edittitle", editPlaylistTitle);
router.delete("/deleteplaylist", deletePlaylist);
router.post("/editimg", editPlaylistImage)


module.exports = router;
