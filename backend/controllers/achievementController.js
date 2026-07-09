const Achievement = require('../models/Achievement');
const fs = require('fs');
const path = require('path');

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
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

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
      // Delete old image if exists
      if (achievement.image) {
        const oldPath = path.join(__dirname, '..', achievement.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      achievement.image = `/uploads/${req.file.filename}`;
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

    // Delete image file if exists
    if (achievement.image) {
      const imgPath = path.join(__dirname, '..', achievement.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await achievement.deleteOne();
    res.json({ message: 'Achievement removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getAchievements, createAchievement, updateAchievement, deleteAchievement };
