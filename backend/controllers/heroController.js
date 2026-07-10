const Hero = require('../models/Hero');
const { uploadBufferToCloudinary } = require('../config/cloudinary');

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

    let avatarVideoUrl;
    let backgroundImageUrl;

    if (req.files) {
      if (req.files.avatarVideo) {
        const result = await uploadBufferToCloudinary(req.files.avatarVideo[0].buffer, 'hero');
        avatarVideoUrl = result.secure_url;
      }
      if (req.files.backgroundImage) {
        const result = await uploadBufferToCloudinary(req.files.backgroundImage[0].buffer, 'hero');
        backgroundImageUrl = result.secure_url;
      }
    }

    let hero = await Hero.findOne();

    if (hero) {
      hero.headline = headline || hero.headline;
      hero.subHeadline = subHeadline || hero.subHeadline;
      if (avatarVideoUrl) hero.avatarVideo = avatarVideoUrl;
      if (backgroundImageUrl) hero.backgroundImage = backgroundImageUrl;

      const updatedHero = await hero.save();
      res.json(updatedHero);
    } else {
      const newHero = new Hero({
        headline,
        subHeadline,
        avatarVideo: avatarVideoUrl,
        backgroundImage: backgroundImageUrl,
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
