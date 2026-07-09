const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    githubLink: {
      type: String,
    },
    liveDemoLink: {
      type: String,
    },
    image: {
      type: String,
      required: true, // stores the path to the uploaded image
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
