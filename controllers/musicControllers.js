const Song = require("../models/Song");
const Genre = require("../models/Genre");

const getAllGenres = async (req, res) => {
  try {
    const allGenres = await Genre.find();
    return res.status(200).json({
      ok: true,
      genres: allGenres,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Something happened",
    });
  }
};

const getSongsByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const songsByGenre = await Song.find({ genre: genre });
    return res.status(200).json({
      ok: true,
      songs: songsByGenre,
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
  getAllGenres,
  getSongsByGenre,
};
