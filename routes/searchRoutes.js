const express = require("express");
const { getSearchResults } = require("../controllers/searchControllers");

const router = express.Router();

router.get("/:query", getSearchResults);

module.exports = router;
