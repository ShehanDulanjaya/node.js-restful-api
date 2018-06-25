const mongoose= require('mongoose');

const shareProject = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required:true},
    projectId: {type: String, required:true},
    todayDate: {type: String, required:true},
    comment: {type: String, required:true},
    mem_id: {type: String, required:true},//user id
    projectFile : {type: String, default:"nothing"}
    
});

module.exports =mongoose.model('ShareProj',shareProject);