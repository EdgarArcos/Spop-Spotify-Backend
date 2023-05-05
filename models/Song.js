const { Schema, model } = require("mongoose");

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    ref: "artist",
    required: true,
  },
  url: {
    type: String,
    ref: "url",
    required: true,
  },
  img: {
    type: String,
    ref: "image",
    required: true,
  },
  genre: {
    type: String,
    ref: "genre",
    required: true,
  },
  like: {
    type: Boolean,
    ref: "like",
    required: true,
  },
  playlist: { type: Schema.Types.ObjectId, ref: 'Playlist' }

});

module.exports = model("Song", songSchema);
