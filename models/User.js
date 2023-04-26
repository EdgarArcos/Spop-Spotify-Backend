const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  img: {
    secure_url: { type: String, required: false },
    public_id: { type: String, required: false },
  },
});

module.exports = model('User', userSchema);
