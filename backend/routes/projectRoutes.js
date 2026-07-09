const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const upload = require('../middlewares/upload');

router.route('/').get(getProjects).post(upload.single('image'), createProject);
router
  .route('/:id')
  .put(upload.single('image'), updateProject)
  .delete(deleteProject);

module.exports = router;
