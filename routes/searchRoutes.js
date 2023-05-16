const express = require("express");
const {
  getSearchResults,
  getPlaylistResults,
  getUserResults,
} = require("../controllers/searchControllers");

const router = express.Router();

router.get("/:query", getSearchResults);
router.get("/playlist/:playlistId", getPlaylistResults);
router.get("/user/:userId", getUserResults);

module.exports = router;
