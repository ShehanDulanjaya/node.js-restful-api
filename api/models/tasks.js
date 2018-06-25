const mongoose= require('mongoose');

const tasksSchema = mongoose.Schema({
    _id:            mongoose.Schema.Types.ObjectId,
    projectID:      { type: String,required:true },
    task:           { type: String,required:true },
    description:    { type: String,required:true },
    startdate:      { type: Date,required:true },
    enddate:        { type: Date ,}
});

module.exports =mongoose.model('Tasks',tasksSchema);