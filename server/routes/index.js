var express = require('express');
var router = express.Router();
const passport = require('passport')
let DB = require('../config/db')
let userModel = require('../model/User')
let User = userModel.User;
/* GET index page. */
router.get('Schedule/index', function(req, res, next) {
    res.render('index', { 
    title: 'Exam Schedule', 
    displayName:req.user ? req.user.displayName:'' });
});
router.get('/login', function(req,res,next){
    if(!req.user){
      res.render('auth/login',{
        title:'Login',
        message:req.flash('loginmessage'),
        displayName:req.user ? req.user.displayName:'' 
      })
    }
    else{
      return res.redirect('/')
    }
  })
  router.post('/login', function(req,res,next){
    passport.authenticate('local',(err, user, info)=>{
      if(!user){
        req.flash('loginMessage', 'AuthenticationError');
        return res.redirect('/login');
      }
      req.login(user,(err)=>{
        if(err){
          return next(err);
        }
        return res.redirect('index')
      })
    })(req,res,next)
  })
  
  router.get('/register', function(req,res,next){
    if(!req.user){
      res.render('Auth/register',
      {
        title:'Register',
        message:req.flash('registerMessage'),
        displayName:req.user ? req.user.displayName:''
      }
    )
    }
  else{
    return res.redirect('/')
  }
  })
  router.post('/register', function(req,res,next){
    let newUser = new User({
      username: req.body.username,
      //password:req.body.password,
      email:req.body.email,
      displayName:req.body.displayName
    })
    User.register(newUser, req.body.password,(err)=>{
      if(err){
        console.log("Error:Inserting the new user");
        if(err.name=="USerExistError"){
          req.flash('registerMessage', 'Registration Error: User already Exists');
        }
        return res.render('auth/register',{
          title:'Register',
          message:req.flash('registerMessage'),
          displayName:req.user ? req.user.displayName:''
  
        })
      }
      else{
        return passport.authenticate('local')(req,res,()=>{
          res.redirect('/index')
        })
      }
    })
  })
  router.get('/logout', function(req,res,next){
    req.logout(function(err){
      if(err){
        return next(err)
      }
    })
    res.redirect('/')
  })
  // exports router
  module.exports = router;  