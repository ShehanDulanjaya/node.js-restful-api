const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const bodyParser = require('body-parser');
const ShareControler = require('../controllers/shareProject');

const storage= multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter =(req, file, cb) =>{
    if(file.mimetype === 'application/x-rar-compressed' || file.mimetype === 'application/zip'){
        cb(null,true);
    }else{
        cb(null,false);
    }  
};

const upload = multer({
    storage:storage, 
    limits:{
    fileSize: 1024 *1024 *5
    },
    fileFilter: fileFilter
});

const Share = require ('../models/shareProject');

router.get('/:projectId', ShareControler.get_all_shares);

router.post('/',checkAuth,upload.single('projectFile'),ShareControler.addshare_projects);

// router.get('/:projectID',projectController.get_a_project);

// router.patch('/:projectID',checkAuth,projectController.update_project);

// router.delete('/:projectID',checkAuth,projectController.delete_project);

module.exports = router;