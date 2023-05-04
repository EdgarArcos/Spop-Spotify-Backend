const { Schema, model } = require('mongoose');

const playlistSchema = new Schema({
  title: {
    type: String,
    required: false,
  },

  img: {
    type: String,
    required: false,
  },

  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Playlist', playlistSchema);
