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