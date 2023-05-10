const express = require('express');
const {
  searchUser,
  deleteUser,
  updateUserRole,
} = require('../controllers/adminControllers');

const router = express.Router();
router.post('/searchUser', searchUser);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUserRole);

module.exports = router;
