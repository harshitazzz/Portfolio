const express = require('express');
const router = express.Router();
const { getContactInfo, updateContactInfo } = require('../controllers/contactInfoController');

router.route('/').get(getContactInfo).post(updateContactInfo);

module.exports = router;
