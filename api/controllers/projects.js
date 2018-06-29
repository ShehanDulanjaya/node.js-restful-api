const Project = require ('../models/projects');
const mongoose= require('mongoose');




//get count of projects which are completed and live in admin
exports.get_count_projects =(req, res, next)=>{
    const adminid=req.params.AdminId;
    var nowDate = new Date();
    


    //var date=nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
    
    
    Project.aggregate([{
        $facet:{
        "completed":[
            {
                "$match": {
                    "AdminId": adminid,
                    "endDate": {
                        "$lt":nowDate 

                    }
                }
            }, 
            {
                "$group": {
                    "_id": {},
                    "COUNT(AdminId)": {
                        "$sum": 1
                    }
                }
            }, 
            {
                "$project": {
                    "_id": 0,
                    "countAdmin": "$COUNT(AdminId)"
                   
                }
            }
        ],"liveAdmin":[
            {
                "$match": {
                    "AdminId": adminid,
                    "endDate": {
                        "$gt":nowDate 

                    }
                }
            }, 
            {
                "$group": {
                    "_id": {},
                    "COUNT(AdminId)": {
                        "$sum": 1
                    }
                }
            }, 
            {
                "$project": {
                    "_id": 0,
                    "countAdmin": "$COUNT(AdminId)"
                }
            }
        ]



    }
    }])
        .exec()
        .then(docs =>{
            docs.map(doc=>{
               // console.log(doc.liveAdmin[0].countAdmin);

                var lo=0
                var ca=0
                console.log(doc);
              if(typeof doc.liveAdmin[0]!== 'undefined'){
                  

                 lo=doc.liveAdmin[0].countAdmin;
                 //console.log(lo);
              }
              if(typeof doc.completed[0]!== 'undefined' ){
                
                ca=doc.completed[0].countAdmin;
               // console.log(doc.completed[0].countMem);
              }
                res.status(201).json({
                
                    adminLive:lo,
                    adminDone:ca,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3000/projects/' + adminid
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

//create projects with admin 
exports.create_projects =  (req,res,next)=>{
  if(req.body.startDate<req.body.endDate){
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        AdminId:req.body.AdminId,
        description:req.body.description,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        
    });
    project
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: 'Created project succesfully',
                createdProject:result,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/projects/' + result._id 
                    }
                
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
        
    }else{
        err
        }

    
}
//get a admin project
exports.get_a_project =(req, res, next) => {
    const id = req.params.projectID;
    Project 
        .find({_id :id})
        .select('_id name AdminId startDate endDate projectFile description')
        .exec()
        .then(doc => {
            console.log("From database",doc);
            if(doc){
                res.status(200).json({
                    project: doc,
                        
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/projects'
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


//get all admin projects
exports.get_all_project =(req, res, next) => {
    const id = req.params.userID;
    Project 
        .find({AdminId :id})
        .select('_id name AdminId startDate endDate projectFile description')
        .exec()
        .then(doc => {
            console.log("From database",doc);
            if(doc){
                res.status(200).json({
                    project: doc,
                        
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/projects'
                    }
                 });
            }
            else{
                res.status(401).json({message: 'No valid Product ID Found'});
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

    
        
}





//update admin projects
exports.update_project =(req, res, next) => {
    const pid =req.params.projectID;
    const userid=req.body.userId;
    Project 
    .find({_id:pid,AdminId:userid})
    .exec()
    .then(result => {
       
        if(result.length>=1)
        {
    Project.update({_id:req.params.projectID},req.body)
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'Project Updated',
                request:{
                    type: 'GET',
                    
                    

                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err,
                message: 'Project Updated Failed',
            });
        });
    }
    else{
        err
    }
}).catch(err =>{
    console.log(err);
    res.status(500).json({
        error: err,
        message: 'Project Updated Failed',
    });
});
}

//dleyte admin project

exports.delete_project =(req, res, next) => {
    
    
    const pid =req.params.projectID;
    const userid=req.params.userID;
    Project 
    .find({_id:pid,AdminId:userid})
    .exec()
    .then(result => {
       
        if(result.length>=1)
        {
    Project.deleteOne({_id: pid})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Project Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/projects',
                    
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message:'Project delete Failed'
            });
        });
    }else{
        err
    }

}) .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err,
        message:'Project delete Failed'

    });
})
}