const User = require("../models/User");
const Song = require("../models/Song");

const getSearchResults = async (req, res) => {
  const { query } = req.params;
  const regex = new RegExp(query, "i");
  const usersQuery = {
    $or: [{ email: { $regex: regex } }, { name: { $regex: regex } }],
  };

  try {
    const users = await User.find(usersQuery);
    const songsByName = await Song.find({ name: regex });
    const songsByArtist = await Song.find({ artist: regex });
    return res.status(200).json({
      ok: true,
      searchResults: { users, songsByName, songsByArtist },
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Something happened",
    });
  }
};

module.exports = { getSearchResults };
