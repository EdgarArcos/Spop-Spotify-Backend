const { Schema, model } = require('mongoose');

const playlistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },

  songs: [{ type: Schema.Types.ObjectId, ref: "Songs" }],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Playlist', playlistSchema);
