const Education = require('../models/Education');

const getEducation = async (req, res) => {
  try {
    const items = await Education.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createEducation = async (req, res) => {
  try {
    const { title, subtitle, cgpa, period } = req.body;
    const edu = new Education({ title, subtitle, cgpa, period });
    const created = await edu.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    const { title, subtitle, cgpa, period } = req.body;
    const edu = await Education.findById(req.params.id);
    if (!edu) return res.status(404).json({ message: 'Not found' });

    edu.title = title || edu.title;
    edu.subtitle = subtitle || edu.subtitle;
    edu.cgpa = cgpa || edu.cgpa;
    edu.period = period || edu.period;

    const updated = await edu.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) return res.status(404).json({ message: 'Not found' });
    await edu.deleteOne();
    res.json({ message: 'Removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
