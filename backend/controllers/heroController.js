const Hero = require('../models/Hero');
const fs = require('fs');
const path = require('path');

// @desc    Get hero data
// @route   GET /api/hero
// @access  Public
const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero || {});
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create or update hero data
// @route   POST /api/hero
// @access  Private
const updateHero = async (req, res) => {
  try {
    const { headline, subHeadline } = req.body;
    
    let hero = await Hero.findOne();

    if (hero) {
      // Update existing
      hero.headline = headline || hero.headline;
      hero.subHeadline = subHeadline || hero.subHeadline;

      if (req.files) {
        if (req.files.avatarVideo) {
          if (hero.avatarVideo) {
            const oldPath = path.join(__dirname, '..', hero.avatarVideo);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          }
          hero.avatarVideo = `/uploads/${req.files.avatarVideo[0].filename}`;
        }
        if (req.files.backgroundImage) {
          if (hero.backgroundImage) {
            const oldPath = path.join(__dirname, '..', hero.backgroundImage);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          }
          hero.backgroundImage = `/uploads/${req.files.backgroundImage[0].filename}`;
        }
      }

      const updatedHero = await hero.save();
      res.json(updatedHero);
    } else {
      // Create new
      const newHero = new Hero({
        headline,
        subHeadline,
        avatarVideo: req.files && req.files.avatarVideo ? `/uploads/${req.files.avatarVideo[0].filename}` : undefined,
        backgroundImage: req.files && req.files.backgroundImage ? `/uploads/${req.files.backgroundImage[0].filename}` : undefined,
      });

      const createdHero = await newHero.save();
      res.status(201).json(createdHero);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getHero,
  updateHero,
};
