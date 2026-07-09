const mongoose = require('mongoose');

const contactInfoSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = ContactInfo;
