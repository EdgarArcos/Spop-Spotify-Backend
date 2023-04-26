const { Schema, model } = require('mongoose');

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  songs: [{ type: String, required: false }],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('List', listSchema);
