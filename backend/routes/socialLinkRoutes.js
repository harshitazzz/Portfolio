const express = require('express');
const router = express.Router();
const { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } = require('../controllers/socialLinkController');

router.route('/').get(getSocialLinks).post(createSocialLink);
router.route('/:id').put(updateSocialLink).delete(deleteSocialLink);

module.exports = router;
