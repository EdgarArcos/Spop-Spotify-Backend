const express = require("express");
const { addNewUser, loginUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", addNewUser);
router.post("/login", loginUser);

module.exports = router;
