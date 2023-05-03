const { Schema, model } = require('mongoose');

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        ref: 'artist',
        required: true,
    },
    url: {
        type: String,
        ref: 'url',
        required: true,
    },
    img: {
        type: String,
        ref: 'image',
        required: true,
    },
    genre: {
        type: String,
        ref: 'genre',
        required: true,
    },
    like: {
        type: Boolean,
        ref: 'like',
        required: true,
    },
});