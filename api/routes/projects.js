const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');
const checkAuth = require('../middleware/check-auth');
const bodyParser = require('body-parser');
const projectController = require('../controllers/projects');



const Project = require ('../models/projects');

router.get('/:AdminId', projectController.get_count_projects);

router.post('/',checkAuth,projectController.create_projects);

router.get('/get/:projectID',projectController.get_a_project);

router.get('/take/:userID',projectController.get_all_project);

router.patch('/:projectID',checkAuth,projectController.update_project);

router.delete('/:projectID',checkAuth,projectController.delete_project);

module.exports = router;