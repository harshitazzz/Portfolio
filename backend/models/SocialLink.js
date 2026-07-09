const mongoose = require('mongoose');

const socialLinkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // e.g. "GitHub", "LinkedIn", "LeetCode", "CodeChef", "Instagram"
    },
    url: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const SocialLink = mongoose.model('SocialLink', socialLinkSchema);

module.exports = SocialLink;
