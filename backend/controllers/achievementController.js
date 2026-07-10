const Achievement = require('../models/Achievement');
const { uploadBufferToCloudinary } = require('../config/cloudinary');

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create an achievement
// @route   POST /api/achievements
// @access  Private
const createAchievement = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image;

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, 'achievements');
      image = result.secure_url;
    }

    const achievement = new Achievement({ title, description, image });
    const created = await achievement.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update an achievement
// @route   PUT /api/achievements/:id
// @access  Private
const updateAchievement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    achievement.title = title || achievement.title;
    achievement.description = description || achievement.description;

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, 'achievements');
      achievement.image = result.secure_url;
    }

    const updated = await achievement.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete an achievement
// @route   DELETE /api/achievements/:id
// @access  Private
const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    await achievement.deleteOne();
    res.json({ message: 'Achievement removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getAchievements, createAchievement, updateAchievement, deleteAchievement };
