const express = require('express');
const { createPlaylist, addToPlaylist, updatePlaylist, getPlaylist, deletePlaylist } = require ("../controllers/playlistControllers");

const router = express.Router();


router.post('/add', createPlaylist);
router.post("/:id/songs", addToPlaylist);
router.put("/editplaylist", updatePlaylist);
router.get("/getplaylists", getPlaylist);
router.delete("/deleteplaylist", deletePlaylist )


module.exports = router;
