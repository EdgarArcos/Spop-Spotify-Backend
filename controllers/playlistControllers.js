const Playlist = require("../models/Playlist");


const createPlaylist = async (req, res) => {
    const newPlaylist = new Playlist({
        title: req.body.title,
        user: req.body.user,
        songs: req.body.songs
    });
    try {
        const savedPlaylist = await newPlaylist.save();
        const populatedPlaylist = await Playlist.findById(savedPlaylist._id).populate('songs');
        return res.status(200).json({
            ok: true,
            playlist: populatedPlaylist
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






module.exports = {createPlaylist, addToPlaylist };