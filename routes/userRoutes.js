const express = require('express');
const {
  editImage,
  aut0Login,
  editUsername,
  handleFollowPlaylist,
} = require('../controllers/userControllers');

const router = express.Router();

router.post('/img', editImage);
router.post('/auth0login', aut0Login);
router.post('/username', editUsername);
router.post('/followPlaylist', handleFollowPlaylist);

module.exports = router;
