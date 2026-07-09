const ContactInfo = require('../models/ContactInfo');

const getContactInfo = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create({
        email: 'harshita@example.com',
        location: 'San Francisco Bay Area, CA'
      });
    }
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateContactInfo = async (req, res) => {
  try {
    const { email, location } = req.body;
    let info = await ContactInfo.findOne();
    if (!info) {
      info = new ContactInfo({ email, location });
    } else {
      info.email = email || info.email;
      info.location = location || info.location;
    }
    const updated = await info.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getContactInfo, updateContactInfo };
