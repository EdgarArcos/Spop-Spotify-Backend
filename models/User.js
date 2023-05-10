const { Schema, model } = require("mongoose");

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

  img: {
    secure_url: { type: String, required: false, default: "" },
    public_id: { type: String, required: false, default: "" },
  },

  role: {
    type: String,
    required: true,
    default: "User",
  },
});

module.exports = model("User", userSchema);
