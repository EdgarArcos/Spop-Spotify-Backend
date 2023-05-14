const User = require("../models/User");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");

const getSearchResults = async (req, res) => {
  const { query } = req.params;
  const regex = new RegExp(query, "i");
  const usersQuery = {
    $or: [{ email: { $regex: regex } }, { name: { $regex: regex } }],
  };

  try {
    const users = await User.find(usersQuery);
    const songsByName = await Song.find({ name: regex });
    const playlistRes = await Playlist.find({ title: regex }).populate(
      "user",
      "name"
    );

    return res.status(200).json({
      ok: true,
      searchResults: { users, songsByName, playlistRes },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Something happened",
    });
  }
};

const getPlaylistResults = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId)
      .populate("songs")
      .populate("user", "name");
    return res.status(200).json({
      ok: true,
      playlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Something happened",
    });
  }
};

module.exports = { getSearchResults, getPlaylistResults };
