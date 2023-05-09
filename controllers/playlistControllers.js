const Playlist = require("../models/Playlist");
const { uploadImg, deleteImg  } = require("../utils/cloudinary");
const fs = require("fs-extra");


const createPlaylist = async (req, res) => {
    const { userId } = req.body;
    
    try {
        const newPlaylist = new Playlist({ user: userId });
        const savedPlaylist = await newPlaylist.save();
        return res.status(200).json({
            ok: true,
            playlist: savedPlaylist
        });

    } catch (err) {
        return res.status(503).json({
        ok: false,
        message: "Something happened"
    })
}
};

const editPlaylistTitle = async (req, res) => {
    console.log(req.body)
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
    console.log(req.body)
    const { playlistId } = req.body;
  try {
    const playlist = await Playlist.findOne({ _id: playlistId });
    const resultToUpload = await uploadImg(req.files.file.tempFilePath);
    const { public_id, secure_url } = resultToUpload;
    const imgToDelete = playlist.img.public_id;

    playlist.img.public_id = public_id;
    playlist.img.secure_url = secure_url;

    if (imgToDelete) {
      await deleteImg(imgToDelete);
    }

    await playlist.save();

    await fs.unlink(req.files.file.tempFilePath);

    return res.status(200).json({
      ok: true,
      img: playlist.img.secure_url,
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
        await Todo.findByIdAndDelete(req.params.playlistId);
        return res.json({
            ok: true,
            message: "Playlist Deleted Successfully"
        });
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        })
    }
};






const addToPlaylist = async (req, res) => {
    console.log(req.body)
    const playlistId = req.body._id;
    const song = {
        title: req.body.title,
        artist: req.body.artist
    };
    try {
        const playlist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $push: { songs: song } },
            { new: true }
        ).populate('songs');
        return res.status(200).json({
            ok: true,
            playlist: playlist
        });
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        })
    }
};






module.exports = {createPlaylist, addToPlaylist, editPlaylistTitle, deletePlaylist, editPlaylistImage  };