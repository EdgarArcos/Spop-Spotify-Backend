const { Schema, model } = require('mongoose');

const songSchema = new Schema({
    title: {
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
        type: String,
        ref: 'image',
        required: false,
    },
    genre: {
        type: String,
        ref: 'genre',
        required: false,
    },
    like: {
        type: Boolean,
        ref: 'like',
        required: false,
    },
});

module.exports = model('Song', songSchema);