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
    song: {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    img: {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    genre: {
        type: String,
        ref: 'genre',
        required: true,
    }
});

module.exports = model("Song", songSchema);
