const express = require("express");
const { addNewUser, loginUser, editImage, aut0Login } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", addNewUser);
router.post("/login", loginUser);
router.post("/img", editImage);
router.post("/auth0login", aut0Login);

module.exports = router;
