var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
var testRouter = require('./routes/test');
var authRouter = require('./routes/authRouter');
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
  var UUID = auth[0];
  var token = auth[1];
  if(UUID == '81855be9-3c51-4746-98cd-0dffaacd0000'
                && token =='6c9deba3f1fac2df20e3a6284469d2dbf502c5eb') {
    next(); //autorizado
  } else {
    var err = new Error('UUID ou token errados! Saia daqui!!!!');
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

//app.use('/', authRouter); //agora fica com / apenas porque quero autenticar antes de qualquer coisa
//app.use('/index', index);
app.use('/test', testRouter);
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
