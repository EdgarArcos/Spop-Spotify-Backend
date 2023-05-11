const Playlist = require("../models/Playlist");

const { uploadImg } = require("../utils/cloudinary");
const fs = require("fs-extra");

const createPlaylist = async (req, res) => {
  const { userId } = req.body;

  try {
    const newPlaylist = new Playlist({ user: userId });
    const savedPlaylist = await newPlaylist.save();
    return res.status(200).json({
      ok: true,
      playlist: savedPlaylist,
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      message: "Something happened",
    });
  }
};

const editPlaylistTitle = async (req, res) => {
  const { newTitle, playlistId } = req.body;

  try {
    await Playlist.findByIdAndUpdate(playlistId, { title: newTitle });
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

const editPlaylistImage = async (req, res) => {
  const { playlistId } = req.body;
  try {
    const playlist = await Playlist.findOne({ _id: playlistId });
    const resultToUpload = await uploadImg(req.files.file.tempFilePath);
    const { secure_url } = resultToUpload;

    playlist.img = secure_url;

    await playlist.save();

    await fs.unlink(req.files.file.tempFilePath);

    return res.status(200).json({
      ok: true,
      img: playlist.img,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Something happened",
    });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.body.playlistId);
    return res.json({
      ok: true,
      message: "Playlist Deleted Successfully",
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      message: "Something happened",
    });
  }
};


const deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.body.songId);
    return res.json({
      ok: true,
      message: "Song Deleted Successfully",
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      message: "Something happened",
    });
  }
};

const addToPlaylist = async (req, res) => {
  const { songId, playlistId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId).populate("songs");

    const existingSong = playlist.songs.find(
      (song) => song._id.toString() === songId
    );
    if (existingSong) {
      return res.status(200).json({
        ok: true,
        playlist: playlist,
      });
    }

    playlist.songs.push(songId);
    await playlist.save();
    const playlistModified = await Playlist.findById(playlistId).populate(
      "songs"
    );

    return res.status(200).json({
      ok: true,
      playlist: playlistModified,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createPlaylist,
  addToPlaylist,
  editPlaylistTitle,
  deletePlaylist,
  editPlaylistImage,
  deleteSong
};
