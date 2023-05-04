const Playlist = require("../models/Playlist");


const createPlaylist = async (req, res) => {
    const newPlaylist = new Playlist({
        title: req.body.title,
        user: req.body.user,
    });
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


module.exports = {createPlaylist};