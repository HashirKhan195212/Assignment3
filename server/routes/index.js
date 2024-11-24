var express = require('express');
var router = express.Router();
const passport = require('passport')
let DB = require('../config/db')
let userModel = require('../model/User')
let User = userModel.User;
/* GET index page. */
router.get('Schedule/index', function(req, res, next) {
    res.render('index', { 
    title: 'Schedule', 
    displayName:req.user ? req.user.displayName:'' });
});