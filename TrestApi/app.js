var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imgRouter = require('./routes/img');
var tokenRouter = require('./routes/token');
var consultantRouter = require('./routes/consultant');
var chatRouter = require('./routes/chat');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/img',imgRouter);
app.use('/token',tokenRouter);
app.use('/consultant', consultantRouter);
app.use('/chat',chatRouter)

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


app.io = require('socket.io')();
/*** Socket.IO 추가 ***/
app.io.on('connection', function(socket){
   
  console.log("a user connected");
  socket.broadcast.emit('hi');
   
  socket.on('disconnect', function(){
      console.log('user disconnected');
  });
   
  socket.on('chat', function(data){
      console.log('message: ' + data);
      app.io.emit('chat', data);
      
  }); 

  
});

module.exports = app;