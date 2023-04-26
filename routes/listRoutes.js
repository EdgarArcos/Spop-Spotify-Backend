const express = require('express');
const { createList } = require ("../controllers/listControllers");

const router = express.Router();


router.post('/add', createList);


module.exports = router;
