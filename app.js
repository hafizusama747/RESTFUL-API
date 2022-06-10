var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


const { urlencoded } = require('express');
var bodyParser = require('body-parser'); 
var fs = require('fs');
var path = require('path');


var productsRouter = require('./routes/api/products');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/products', productsRouter);
app.use(express.json());
app.use(urlencoded({extended: true}));


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
  res.render('error');
});

mongoose.connect(("mongodb://localhost/myproject"),
{useNewUrlParser:true}).then(()=>console.log("Connected to mongodb..."))
.catch((error)=>console.log(error.message));



module.exports = app;
