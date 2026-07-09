const express = require('express');
const router = express.Router();
const { getAchievements, createAchievement, updateAchievement, deleteAchievement } = require('../controllers/achievementController');
const upload = require('../middlewares/upload');

router.route('/')
  .get(getAchievements)
  .post(upload.single('image'), createAchievement);

router.route('/:id')
  .put(upload.single('image'), updateAchievement)
  .delete(deleteAchievement);

module.exports = router;
