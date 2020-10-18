var createError = require('http-errors');
var express = require('express');
const cors = require('cors');

var dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');


const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/auth', authRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send({err});
});

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});

module.exports = app;
