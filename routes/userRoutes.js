const express = require("express");
const {
  editImage,
  aut0Login,
  editUsername,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/img", editImage);
router.post("/auth0login", aut0Login);
router.post("/username", editUsername);

module.exports = router;
