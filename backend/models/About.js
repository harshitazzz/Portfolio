const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    subHeadline: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model('About', aboutSchema);

module.exports = About;
