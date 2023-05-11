const express = require('express');
const { createPlaylist, addToPlaylist, editPlaylistTitle, deletePlaylist, editPlaylistImage, deleteSong } = require ("../controllers/playlistControllers");

const router = express.Router();


router.post('/add', createPlaylist);
router.post("/addsong", addToPlaylist);
router.put("/edittitle", editPlaylistTitle);
router.delete("/deleteplaylist", deletePlaylist);
router.post("/editimg", editPlaylistImage);
router.delete("deletesong", deleteSong)


module.exports = router;
