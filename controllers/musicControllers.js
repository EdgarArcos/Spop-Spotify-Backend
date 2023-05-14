const Song = require("../models/Song");
const Genre = require("../models/Genre");
const Playlist = require("../models/Playlist");

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

const handleLikeSong = async (req, res) => {
  const { userId, songId } = req.body;
  try {
    const likedSongs = await Playlist.findOne({
      user: userId,
      title: "Liked Songs",
    });
    if (likedSongs.songs.includes(songId)) {
      await likedSongs.songs.pull(songId);
      await likedSongs.save();
      const newLikedSongs = await Playlist.findById(likedSongs._id).populate(
        "songs"
      );
      return res.status(200).json({
        ok: true,
        likedSongs: newLikedSongs,
        msg: "deleted",
      });
    }
    likedSongs.songs.push(songId);
    await likedSongs.save();
    const newLikedSongs = await Playlist.findById(likedSongs._id).populate(
      "songs"
    );
    return res.status(200).json({
      ok: true,
      likedSongs: newLikedSongs,
      msg: "added",
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
  handleLikeSong,
};
