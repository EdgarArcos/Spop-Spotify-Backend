const express = require("express");
const {
  getSearchResults,
  getPlaylistResults,
} = require("../controllers/searchControllers");

const router = express.Router();

router.get("/:query", getSearchResults);
router.get("/playlist/:playlistId", getPlaylistResults);

module.exports = router;
