const User = require('../models/User');
const Playlist = require('../models/Playlist');

const searchUser = async (req, res) => {
  const { inputValue } = req.body;
  const regex = new RegExp(inputValue, 'i');
  try {
    const user = await User.find({ email: regex });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }
    return res.status(200).json({
      ok: true,
      users: user,
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

  try {
    await User.findByIdAndDelete(userId);
    await Playlist.deleteMany({ user: userId });
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

const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { role });
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
  updateUserRole,
};
