const mongoose= require('mongoose');

const projectsmem = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    projectId: {type: String, required:true},
    projectName: {type: String, required:true},
    startDate: {type: Date, required:true},
    endDate: {type: Date, required:true},
    mem_id: {type: String, required:true},//user id
    role: {type: String, default:"member"},
    email: {type: String, required:true},
    
});

module.exports =mongoose.model('Projectmem',projectsmem);