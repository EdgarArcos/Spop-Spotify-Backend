const User = require("../models/User");
const bcrypt = require("bcrypt");
const { uploadImg, deleteImg  } = require ("../utils/cloudinary");
const fs = require("fs-extra");

const addNewUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "A user already exists with this email",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password do not match",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    return res.status(201).json({
      ok: true,
      user: newUser._id,
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Wrong email or password",
      });
    }

    const userPassword = user.password;
    const isPasswordOk = await bcrypt.compare(password, userPassword);

    if (!isPasswordOk) {
      return res.status(400).json({
        ok: false,
        msg: "Wrong email or password",
      });
    }
    return res.status(200).json({
      ok: true,
      user: user._id,
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened",
    });
  }
};


const editImage = async (req, res) => {
  const { userId } = req.body;
  try {
      const user = await User.findOne({ _id: userId });

      let public_id, secure_url;
      try {
          const resultToUpload = await uploadImg(req.files.file.tempFilePath);
          public_id = resultToUpload.public_id;
          secure_url = resultToUpload.secure_url;
      } catch (error) {
          return res.status(500).json({
              ok: false,
              msg: "Error uploading image",
              error: error.message,
          });
      }

      const imgToDelete = user.img.public_id;
      user.img.public_id = public_id;
      user.img.secure_url = secure_url;


      if (imgToDelete) {
          try {
              await deleteImg(imgToDelete);
          } catch (error) {
              console.error(`Error deleting image with public_id ${imgToDelete}:`, error);
          }
      }

      await user.save();

      await fs.unlink(req.files.file.tempFilePath);

      return res.status(200).json({
          ok: true,
          img: user.img.secure_url,
      });
  } catch (error) {
      console.error("Error updating image", error);
      return res.status(500).json({
          ok: false,
          msg: "Error updating image",
          error: error.message,
      });
  }
};

module.exports = {
  addNewUser,
  loginUser,
  editImage
};
