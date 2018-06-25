const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const productController = require('../controllers/product');

const storage= multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter =(req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
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

const Product = require ('../models/product');

router.get('/', productController.get_all_products);

router.post('/', checkAuth, upload.single('productImage'), productController.create_order);

router.get('/:productID',productController.get_a_product);

router.patch('/:productID',checkAuth,productController.update_product);

router.delete('/:productID',checkAuth,productController.delete_product);

module.exports = router;