const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveDemoLink } = req.body;
    let techStackArray = techStack;

    if (typeof techStack === 'string') {
      techStackArray = techStack.split(',').map((s) => s.trim());
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const project = new Project({
      title,
      description,
      techStack: techStackArray,
      githubLink,
      liveDemoLink,
      image: `/uploads/${req.file.filename}`,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveDemoLink } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.githubLink = githubLink || project.githubLink;
      project.liveDemoLink = liveDemoLink || project.liveDemoLink;

      if (techStack) {
        project.techStack = typeof techStack === 'string' ? techStack.split(',').map((s) => s.trim()) : techStack;
      }

      if (req.file) {
        // Delete old image if it exists
        if (project.image) {
          const oldImagePath = path.join(__dirname, '..', project.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        project.image = `/uploads/${req.file.filename}`;
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      // Delete image
      if (project.image) {
        const imagePath = path.join(__dirname, '..', project.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
