const SocialLink = require('../models/SocialLink');

const getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find().sort({ order: 1, createdAt: 1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createSocialLink = async (req, res) => {
  try {
    const { title, url, order } = req.body;
    const link = new SocialLink({ title, url, order: order || 0 });
    const created = await link.save();
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const updateSocialLink = async (req, res) => {
  try {
    const { title, url, order } = req.body;
    const link = await SocialLink.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Not found' });

    link.title = title || link.title;
    link.url = url || link.url;
    if (order !== undefined) link.order = order;

    const updated = await link.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const deleteSocialLink = async (req, res) => {
  try {
    const link = await SocialLink.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Not found' });
    await link.deleteOne();
    res.json({ message: 'Removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink };
