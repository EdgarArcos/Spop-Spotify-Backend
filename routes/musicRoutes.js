const express = require("express");
const {
  getAllGenres,
  getSongsByGenre,
} = require("../controllers/musicControllers");

const router = express.Router();

router.get("/genres", getAllGenres);
router.get("/:genre", getSongsByGenre);

module.exports = router;
