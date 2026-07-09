const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');
const upload = require('../middlewares/upload');

router.route('/').get(getHero).post(
  upload.fields([
    { name: 'avatarVideo', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
  ]),
  updateHero
);

module.exports = router;
