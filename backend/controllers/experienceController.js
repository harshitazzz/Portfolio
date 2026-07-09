const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res) => {
  try {
    const { role, company, period, description } = req.body;

    const experience = new Experience({
      role,
      company,
      period,
      description
    });

    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an experience
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
  try {
    const { role, company, period, description } = req.body;

    const experience = await Experience.findById(req.params.id);

    if (experience) {
      experience.role = role || experience.role;
      experience.company = company || experience.company;
      experience.period = period || experience.period;
      experience.description = description || experience.description;

      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      await experience.deleteOne();
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
