const Product = require ('../models/product');
const mongoose= require('mongoose');

exports.get_all_products =(req, res, next)=>{
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response={
                count: docs.length,
                product: docs.map(doc =>{
                    return{
                        name:doc.name,
                        price:doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3000/product/' + doc._id
                        }
                    }
                })
            };
            // if(docs.length >=0){
                res.status(200).json(response);
            // }
            // else{
            //     res.status(404).json({
            //         message: "No entries Found"
            //     });
            // }
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}


exports.create_order =  (req,res,next)=>{
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: 'Created product succesfully',
                createdProduct:{
                    name:result.name,
                    price: result.price,
                    _id: result._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/product/' + result._id 
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.get_a_product =(req, res, next) => {
    const id = req.params.productID;
    Product 
        .find({_id :id})
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            console.log("From database",doc);
            if(doc){
                res.status(200).json({
                    product: doc,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/product'
                    }
                 });
            }
            else{
                res.status(404).json({message: 'No valid Product ID Found'});
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
        
}


exports.update_product =(req, res, next) => {
    
    const id=req.params.productID;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id},{$set:updateOps})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'Product Updated',
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/product/'+ id

                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.delete_product =(req, res, next) => {
    
    const id=req.params.productID;

    Product.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/product',
                   
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}