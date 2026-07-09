const About = require('../models/About');

// @desc    Get about data
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || {});
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create or update about data
// @route   POST /api/about
// @access  Private
const updateAbout = async (req, res) => {
  try {
    const { headline, subHeadline, techStack } = req.body;
    
    let techStackArray = techStack;
    if (typeof techStack === 'string') {
      techStackArray = techStack.split(',').map((s) => s.trim());
    }

    let about = await About.findOne();

    if (about) {
      // Update existing
      about.headline = headline || about.headline;
      about.subHeadline = subHeadline || about.subHeadline;
      if (techStackArray) {
        about.techStack = techStackArray;
      }
      const updatedAbout = await about.save();
      res.json(updatedAbout);
    } else {
      // Create new
      const newAbout = new About({
        headline,
        subHeadline,
        techStack: techStackArray || [],
      });

      const createdAbout = await newAbout.save();
      res.status(201).json(createdAbout);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAbout,
  updateAbout,
};
