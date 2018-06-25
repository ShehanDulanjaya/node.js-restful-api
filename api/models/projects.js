const mongoose= require('mongoose');

const projectsmem = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    description: {type: String, required:true},
    AdminId: {type: String,required:true},
    startDate: {type: Date, required:true},
    endDate: {type: Date, required:true}
   
});

module.exports =mongoose.model('Project',projectsmem);