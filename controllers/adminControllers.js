const User = require('../models/User');

const searchUser = async (req, res) => {
  const { inputValue } = req.body;
  try {
    const user = await User.findOne({ email: inputValue });
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }
    return res.status(200).json({
      ok: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      message: 'Operation not done, an error ocurred',
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      message: 'Operation not done, an error occurred',
    });
  }
};

module.exports = {
  searchUser,
  deleteUser,
};
