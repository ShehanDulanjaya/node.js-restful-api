const Tasks = require ('../models/tasks');
const mongoose= require('mongoose');

//get all admin task
exports.get_all_tasks =(req, res, next)=>{
    const projectid = req.params.projectID;
    Tasks.find({projectID:projectid})
        .exec()
        .then(docs => {
            const response={
                count: docs.length,
                project: docs.map(doc =>{
                    return{
                        id:             doc._id,
                        task:           doc.task,
                        description:    doc.description,
                        startdate:      doc.startdate,
                        enddate:        doc.enddate,
                        projectID:      doc.projectID

                    }
                })
            };
            if(docs.length >=0){
                res.status(200).json(response);
            }
            else{
                res.status(404).json({
                    message: "No Projects Found"
                });
            }
           
        })
        .catch(err => {
            
            res.status(500).json({
                error: err
            });
        });
    
};

//create new admin task
exports.create_new_task = (req, res, next) => {
    if(req.body.startdate<req.body.enddate){
    const task = new Tasks({
        _id: new mongoose.Types.ObjectId(),
        task: req.body.task,
        description: req.body.description,
        projectID: req.body.projectID,
        startdate: req.body.startdate,
        enddate: req.body.enddate
    });
    task
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Task Successfully Created',
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

//update task
exports.update_task =(req, res, next) => {
    const id=req.params.taskID;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Tasks.update({_id: id},{$set:updateOps})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'Task successfully Updated',
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_task = (req,res,next) =>{
    const id=req.params.taskID;

    Tasks.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Task Successfully Removed'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}