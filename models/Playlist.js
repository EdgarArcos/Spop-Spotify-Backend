const { Schema, model } = require('mongoose');

const playlistSchema = new Schema({
  title: {
    type: String,
    required: false,
    default: "My playlist"
  },

  img: {
    type: String,
    required: false,
    public_id: { type: String, required: false, default: "" },
    default: "https://res.cloudinary.com/dycz1nib9/image/upload/v1683280442/Artist_Songs/createplaylist_ml9at0.png"
  },

  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Playlist', playlistSchema);
