const { Schema, model } = require("mongoose");

const songSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        ref: 'artist',
        required: true,
    },
    url: {
        type: String, required: true
    },
    img: {
        type: String, required: true
    },
    genre: {
        type: String,
        ref: 'genre',
        required: true,
    }
});

module.exports = model("Song", songSchema);
