const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const User = require('../models/user')

exports.Signup =(req, res, next)=>{
    User.find({email : req.body.email})
       .exec()
       .then(user => {
           if (user.length >= 1){
               return res.status(409).json({
                   message: 'Mail Exist'
               });
           }else{
               bcrypt.hash(req.body.password, 10, (err, hash) => {
                   if (err) {
                       return res.status(500).json({
                           error: err
                       });
                   }else{
                       const user= new User({
                           _id: new mongoose.Types.ObjectId(),
                           email: req.body.email,
                           name: req.body.name,
                           password: hash
                       });
                       user
                           .save()
                           .then(result => {
                               console.log(result);
                               res.status(201).json({
                                   message: 'User Created'
                               });
                           })
                           .catch(err => {
                               console.log(err);
                               res.status(500).json({
                                   error: err
                               });
                           });
                   }
               })
           }
       })        
}

exports.login = (req, res, next) =>{
    //console.log(req.headers);
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length<1){
                return res.status(401).json({
                    message: 'Auth Failed'
                    
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: 'Auth Failed'
                       

                    });
                }
                if(result){
                    const token =jwt.sign(
                    {
                        email:user[0].email,
                        userID: user[0]._id
                    },
                    "secret", 
                    {
                        expiresIn: "1h"
                    }
                );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        user:{
                            id:user[0]._id,
                            email:user[0].email,
                            name:user[0].name
                        }

                    });
                }
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteuser=(req, res, next) => {
    User.remove({ _id: req.params.userID})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }

    exports.get_all_users =(req, res, next)=>{
        User.find()
             .select('_id name email ')
            .exec()
            .then(docs => {
                const response={
                    count: docs.length,
                    users: docs.map(doc =>{
                        return{
                            id:             doc._id,
                            name:           doc.name,
                            email:      doc.email
                        }
                    })
                };
                if(docs.length >=0){
                    res.status(200).json(response);
                }
                else{
                    res.status(404).json({
                        message: "No users Found"
                    });
                }
               
            })
            .catch(err => {
                
                res.status(500).json({
                    error: err
                });
            });
        
    };