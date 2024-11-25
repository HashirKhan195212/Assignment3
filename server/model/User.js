// Hashir Khan 100911091
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose')
let User = mongoose.Schema({
    username:
    {
        type:String,
        default:"",
        trim:true,
        equired:'Username is required'
    },
    /*password:
    {
        type:String,
        default:"",
        trim:true,
        equired:'Password is required'
    },*/
    email:
    {
        type:String,
        default:"",
        trim:true,
        required:'Email is required'
    },
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:'Display name is required'
    },
    created:{
        type:Date,
        default:Date.now
    },
    update:
    {
        type:Date,
        default:Date.now
    }
},
{
    collection:"user"
})
let options = ({MissingPasswordError: 'Wrong/Missing Password'})
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);