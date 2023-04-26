const User = require("../models/User");
const bcrypt = require("bcrypt");

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

module.exports = {
  addNewUser,
  loginUser,
};
