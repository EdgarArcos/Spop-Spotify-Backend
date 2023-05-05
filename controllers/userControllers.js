const User = require("../models/User");
const Playlist = require("../models/Playlist");
const bcrypt = require("bcrypt");
const { uploadImg } = require("../utils/cloudinary");
const fs = require("fs-extra");

const aut0Login = async (req, res) => {
  console.log(req.body.email);

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
      });
      await newUser.save();
      const likedSongs = await new Playlist({
        title: "Liked Songs",
        img: "https://res.cloudinary.com/dycz1nib9/image/upload/v1683276186/Artist_Songs/likedsongsbig_edgts4.png",
        songs: [],
        user: newUser._id,
      });
      await likedSongs.save();
      return res.status(201).json({
        ok: true,
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    }

    return res.status(200).json({
      ok: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        img: user.img.secure_url,
      },
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      message: "Something happened",
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
        msg: "User not found",
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
      img: user.img.secure_url,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Something happened",
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
      msg: "Something happened",
    });
  }
};

module.exports = {
  editImage,
  aut0Login,
  editUsername,
};
