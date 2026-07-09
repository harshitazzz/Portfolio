const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
