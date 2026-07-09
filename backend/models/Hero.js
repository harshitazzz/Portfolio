const mongoose = require('mongoose');

const heroSchema = mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    subHeadline: {
      type: String,
      required: true,
    },
    avatarVideo: {
      type: String, // Path to uploaded video
    },
    backgroundImage: {
      type: String, // Path to uploaded image
    },
  },
  {
    timestamps: true,
  }
);

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
