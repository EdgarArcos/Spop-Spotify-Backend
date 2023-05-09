const Playlist = require("../models/Playlist");


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

const updatePlaylist = async (req, res) => {
    try {   
        const updatedTodo = await Todo.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        img: req.body.img,
    }, { new: true });
        return res.status(200).json(updatedPlaylist);
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        })
    }
};

const getPlaylist = async (req, res) => {

    const { userId } = req.body;


    try {
        const playlists = await Playlist.find({ user: userId })    
        return res.status(200).json(playlists);
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
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






module.exports = {createPlaylist, addToPlaylist, updatePlaylist, getPlaylist, deletePlaylist  };