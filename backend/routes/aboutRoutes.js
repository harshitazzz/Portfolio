const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');

router.route('/').get(getAbout).post(updateAbout);

module.exports = router;
