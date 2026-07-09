const express = require('express');
const router = express.Router();
const { getMessages, deleteMessage } = require('../controllers/messageController');

router.route('/').get(getMessages);
router.route('/:id').delete(deleteMessage);

module.exports = router;
