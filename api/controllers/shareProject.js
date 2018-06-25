const Share = require ('../models/shareProject');
const mongoose= require('mongoose');
const Projectmem = require ('../models/projectmembers');

exports.get_all_shares =(req, res, next)=>{
    const pid=req.params.projectId;
    Share.find({projectId:pid})
        .select('_id username mem_id projectId todayDate comment projectFile ')
        .exec()
        .then(docs => {
            const response={
                count: docs.length,
                Sharedproject: docs.map(doc =>{
                    return{
                        _id: doc._id,
                        username:doc.username,
                        mem_id:doc.mem_id,
                        projectFile: doc.projectFile,
                        comment:doc.comment,
                        todayDate: doc.todayDate,
                        
                        DownloadprojectFile:'http://localhost:3000/'+doc.projectFile,

                        request:{
                            type: 'GET',
                            url: 'http://localhost:3000/share/' + doc._id
                        }
                    }
                })
            };
            
                res.status(200).json(response);
           
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}




exports.addshare_projects =  (req,res,next)=>{
    console.log(req.file)
    const userid=req.body.userid;
    const pid=req.body.projectId;
    

    ///////////////////////////////check admin

    // Projectmem 
    //     .find({projectId:pid,mem_id:userid})
    //     .exec()
    //     .then(result => {
           
    //         if(result.length>=1)
    //         {
    //             const shareproj = new Share({
    //                 _id: new mongoose.Types.ObjectId(),
    //                username:req.body.memname,
    //                projectId:req.body.projectId,
    //                mem_id:req.body.userid,
    //                todayDate:req.body.todayDate,
    //                comment:req.body.comment,
    //                projectFile: req.file.path,
                   
                   
    //             });
    //             shareproj
    //                 .save()
    //                 .then(doc =>{
    //                     console.log(doc);
    //                     res.status(201).json({
    //                         message: 'Share succesfully',
    //                         sharedProject:doc
    //                     });
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                     res.status(500).json({
    //                         error: err
    //                     });
    //                 });

    //         } 
    //         else
    //         {
    //             res.status(500).json({
    //                 message: 'share failed'});
    //         }

    //     }).catch(err=>
    //         {
    //             res.status(500).json({
    //                 message: 'share failed'});
    //         })
/////////////////////////////////

            
        
         }