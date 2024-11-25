// Hashir Khan 100911091
let mongoose = require('mongoose')
//create a model class
let scheduleModel = mongoose.Schema({
    Course:String,
    CourseCode:String,
    Professor:String,
    Day:String,
    Weight:Number,
},
{
    // creating a collection
    collection: "Exam"
}
)
module.exports = mongoose.model('Schedule', scheduleModel)