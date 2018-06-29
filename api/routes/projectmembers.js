const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');

const checkAuth = require('../middleware/check-auth');
const bodyParser = require('body-parser');
const projectmemController = require('../controllers/projectmembers');



const Project = require ('../models/projects');
const Projectmem = require('../models/projectmembers.js');


router.get('/all/:projectId', projectmemController.get_all_projects);

router.get('/mem/:mem_id', projectmemController.get_a_id_members);

router.post('/',checkAuth,projectmemController.addmem_projects);

router.get('/:name',projectmemController.get_A_member);

router.get('/count/:userId',projectmemController.get_count_projects);

router.delete('/:pmemId',checkAuth,projectmemController.delete_member);

module.exports = router;