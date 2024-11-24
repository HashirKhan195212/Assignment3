// For creating HTTP errors
let createError = require('http-errors');
// For Express
let express = require('express');
 // For handling and transforming file paths
let path = require('path');
// For parsing cookies
let cookieParser = require('cookie-parser');
// For logging HTTP requests
let logger = require('morgan');
// Making routes
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
// Express application
let app = express();
// Cors application
let cors = require('cors')
// create a user model instance
let userModel = require('../model/User');
let User = userModel.User;
let session = require('express-session')
let passport = require('passport')
let passportLocal = require('passport-local')
let flash = require('connect-flash')
passport.use(User.createStrategy());
let localStrategy = passportLocal.Strategy;
let mongoose = require('mongoose');
let DB = require('./db')
mongoose.connect(DB.URI);
// Set up MongoDB connection using Mongoose
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'))
mongoDB.once('open',()=>{
  console.log('MongoDB connected')
})
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}))
app.use(flash())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());
