const User = require('../models/User');
const Playlist = require('../models/Playlist');
const { uploadImg } = require('../utils/cloudinary');
const fs = require('fs-extra');

const aut0Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      'followedPlaylists'
    );

    if (!user) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
      });
      await newUser.save();
      const likedSongs = new Playlist({
        title: 'Liked Songs',
        img: 'https://res.cloudinary.com/dycz1nib9/image/upload/v1683276186/Artist_Songs/likedsongsbig_edgts4.png',
        songs: [],
        user: newUser._id,
      });
      await likedSongs.save();
      return res.status(201).json({
        ok: true,
        user: newUser,
        playlist: [likedSongs],
      });
    }
    const playlist = await Playlist.find({ user: user._id }).populate('songs');
    return res.status(200).json({
      ok: true,
      user,
      playlist: playlist,
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      message: 'Something happened',
    });
  }
};

const editImage = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }

    const result = await uploadImg(req.files.file.tempFilePath);
    user.img = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };

    await fs.unlink(req.files.file.tempFilePath);
    await user.save();
    await fs.remove(req.files.file.tempFilePath);

    return res.status(200).json({
      ok: true,
      img: user.img,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

const editUsername = async (req, res) => {
  const { newName, userId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { name: newName });
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

const handleFollowPlaylist = async (req, res) => {
  const { userId, playlistId } = req.body;
  try {
    const user = await User.findById(userId);

    if (user.followedPlaylists.includes(playlistId)) {
      await user.followedPlaylists.pull(playlistId);
      await user.save();
      const userChanges = await User.findById(userId).populate(
        'followedPlaylists'
      );
      return res.status(200).json({
        ok: true,
        followedPlaylists: userChanges.followedPlaylists,
      });
    }

    user.followedPlaylists.push(playlistId);
    await user.save();
    const userChanges = await User.findById(userId).populate(
      'followedPlaylists'
    );

    return res.status(200).json({
      ok: true,
      followedPlaylists: userChanges.followedPlaylists,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: 'Something happened',
    });
  }
};

module.exports = {
  editImage,
  aut0Login,
  editUsername,
  handleFollowPlaylist,
};
