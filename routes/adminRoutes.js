const express = require('express');
const { searchUser, deleteUser } = require ("../controllers/adminControllers");


const router = express.Router();
router.post('/searchUser', searchUser)
router.delete('/:userId', deleteUser)



module.exports = router;
