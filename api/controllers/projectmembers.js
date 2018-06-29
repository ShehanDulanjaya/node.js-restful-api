const Projectmem = require ('../models/projectmembers');
const mongoose= require('mongoose');
const Project=require('../models/projects');
const User = require('../models/user');
const user = require('../controllers/projectmembers.js');



//get a member of other project
exports.get_A_member =(req, res, next) => {
    const x = req.params.name;
    Projectmem 
    .find().or([{name:{ "$regex": x, "$options": "i" }},{projectName:{ "$regex": x, "$options": "i" }}])
        .exec()
        .then(doc => {
           
            if(doc){
                res.status(200).json({
                    member: doc,
                        
                        
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/projectmem '
                    }
                 });
            }
            else{
                res.status(404).json({message: 'no Valid member Found'});
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
        
}


//get count of other projects with completed and still live
exports.get_count_projects =(req, res, next)=>{
    const memid=req.params.userId;
    //console.log(memid);
    var nowDate = new Date();
    


    //var date=nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
    
    
    Projectmem.aggregate([{
        $facet:{
        "completed":[
            {
                "$match": {
                    "mem_id": memid,
                    "endDate": {
                        "$lt":nowDate 

                    }
                }
            }, 
            {
                "$group": {
                    "_id": {},
                    "COUNT(mem_id)": {
                        "$sum": 1
                    }
                }
            }, 
            {
                "$project": {
                    "_id": 0,
                    "countMem": "$COUNT(mem_id)",
                    "nothing" :"null"
                   
                }
            }
        ],"liveOther":[
            {
                "$match": {
                    "mem_id": memid,
                    "endDate": {
                        "$gt":nowDate 

                    }
                }
            }, 
            {
                "$group": {
                    "_id": {},
                    "COUNT(mem_id)": {
                        "$sum": 1
                    }
                }
            }, 
            {
                "$project": {
                    "_id": 0,
                    "countMem": "$COUNT(mem_id)",
                    "nothing" :"null"
                }
            }
        ]



    }
    }])
        .exec()
        .then(docs =>{
            docs.map(doc=>{
               // console.log((doc.completed[0]).length);
                var lo=0
                var ca=0
                console.log(doc);
              if(typeof doc.liveOther[0]!== 'undefined'){
                  

                 lo=doc.liveOther[0].countMem;
                 console.log(lo);
              }
              if(typeof doc.completed[0]!== 'undefined' ){
                
                ca=doc.completed[0].countMem;
                console.log(doc.completed[0].countMem);
              }
              
                res.status(201).json({
                    
                 otherLive:lo,
                   otherDone:ca,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3000/projects/' + memid
                        }
                    
                });
                
            })
                   
    
                })
              
            
        

       
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}











//get all other projects
exports.get_all_projects =(req, res, next)=>{
    const id = req.params.projectId;
    Projectmem.find({projectId:id})
        .exec()
        .then(docs => {
            res.status(200).json({
                projectmems:docs,

                        

                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/projects/'
                
            }
            })   
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}

//get all member not admin projects
exports.get_a_id_members =(req, res, next)=>{
    const id = req.params.mem_id;
    Projectmem.find({mem_id:id})
        .exec()
        .then(docs => {
            res.status(200).json({
                projectmems:docs,

                        

                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/projects/'
                
            }
            })   
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}





exports.addmem_projects =  (req,res,next)=>{
    
    const userid=req.body.userid;
    const pid=req.body.projectId;
    const memid=req.body.mem_id;
    



    User.find({_id : memid})
       .exec()
       .then(dat => {
           if (dat.length <= 0){
               return res.status(409).json({
                   message: 'Wrong Member in Database'
               });
           }else
           {
             


//////////////////////////////
Projectmem.find({projectId : pid,mem_id:memid})
       .exec()
       .then(user => {
           if (user.length >= 1){
               return res.status(409).json({
                   message: 'Member Exist'
               });
           }else
           {
    ///////////////////////////////check admin

    Project 
        .findOne({_id:pid})
        .select('AdminId name startDate endDate')
        .exec()
        .then(result => {
           
            if(result.AdminId===userid)
            {
                const projectmem = new Projectmem({
                    _id: new mongoose.Types.ObjectId(),
                   name:req.body.name,
                   projectId:req.body.projectId,
                   projectName:result.name,
                   startDate:result.startDate,
                   endDate :result.endDate,
                   mem_id: req.body.mem_id,
                   email:dat[0].email,

                   
                   
                   
                });
                projectmem
                    .save()
                    .then(doc =>{
                        console.log(doc);
                        res.status(201).json({
                            message: 'Member add succesfully',
                            createdMember:doc
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });

            } 
            else
            {
                res.status(500).json({
                    message: 'Member add failed'});
            }

        }).catch(err=>
            {
                res.status(500).json({
                    message: 'member add failed'});
            })
/////////////////////////////////

        }})

    }}).catch(err => {
        console.log(err);
        res.status(500).json({
           
            message:"wrong member"
        });
    });
        
 }

         exports.delete_member =(req, res, next) => {
    
            const id=req.params.pmemId;
        
            Projectmem.deleteOne({_id: id})
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: 'Member Deleted',
                        
                        request: {
                            type: 'POST',
                            url: 'http://localhost:3000/projects',
                            
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

 