const Playlist = require("../models/Playlist");
const User = require("../models/User")


const createPlaylist = async (req, res) => {
    console.log(req.body)
    const { title, img, songs, userId } = req.body;
    const newPlaylist = new Playlist({ title, img, songs, user: userId });

    try {
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