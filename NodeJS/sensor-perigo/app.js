var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');

var index = require('./routes/index');
//var users = require('./routes/users');
var userRouter = require('./routes/userRouter');
var contactRouter = require('./routes/contactRouter');
var buttonRouter = require('./routes/buttonRouter');

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/sensor-perigo'; mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'erro de conexão: '));
db.once('open', function () {
  //estamos conectados
  console.log('Conectado corretamente com o servidor');
});

/*
//Criando método de autenticação
function auth (req, res, next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if(!authHeader) {
    var err = new Error("você não está autenticado! Saia daqui!!!!");
    err.status = 401;
    next(err);
    return;
  }

  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  if(user == 'admin' && pass =='password') {
    next(); //autorizado
  } else {
    var err = new Error('Login ou senha errados! Saia daqui!!!!');
    next(err);
  }
}
*/

var app = express();

//autenticação
//app.use(auth);

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', users); //agora fica com / apenas porque quero autenticar antes de qualquer coisa
app.use('/users', userRouter);
app.use('/contacts', contactRouter);
app.use('/buttons', buttonRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;


/*  //versão original que foi criada junto com o projeto
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
  res.render('error');
});

module.exports = app;
*/
