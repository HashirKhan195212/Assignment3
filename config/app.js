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
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error',{title:'Error'});
  });
  // app module
  module.exports = app;