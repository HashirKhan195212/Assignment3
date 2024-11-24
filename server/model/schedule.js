let mongoose = require('mongoose')
//create a model class
let calculatorModel = mongoose.Schema({
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
module.exports = mongoose.model('Schedule', calculatorModel)