const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  handle: {
    type: String,
    required: true,
    max: 30,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    require: true,
  },
  bio: {
    type: String,
  },

  experience: [
    {
      title: {
        type: String,
        require: true,
      },
      company: {
        type: String,
        require: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = model("Profile", profileSchema);
