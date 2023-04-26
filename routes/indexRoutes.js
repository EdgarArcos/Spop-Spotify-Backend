const express = require('express');
const listRoutes = require("./list.js");


const router = express.Router();


router.use('/list', listRoutes);

module.exports = router;