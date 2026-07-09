const mongoose = require('mongoose');

const educationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    cgpa: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
