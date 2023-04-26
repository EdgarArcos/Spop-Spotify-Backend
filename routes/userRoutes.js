const express = require("express");
const { addNewUser, loginUser, editImage } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", addNewUser);
router.post("/login", loginUser);
router.post("/img", editImage)

module.exports = router;
