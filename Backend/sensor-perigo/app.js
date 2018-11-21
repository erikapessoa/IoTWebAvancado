var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const knotCloud = require('knot-cloud'); //https://github.com/CESARBR/knot-lib-node


var index = require('./routes/index');
var authRouter = require('./routes/authRouter');
var userRouter = require('./routes/userRouter');
var contactRouter = require('./routes/contactRouter');
var buttonRouter = require('./routes/buttonRouter');

const cloud_url = 'http://knot.local'; //'http://knot-test.cesar.org.br'; //'192.168.0.102'
//const cloud_url = 'http://192.168.0.32';
const cloud_port = 3000;
const user_uuid = '6e1e4a87-b9d5-4960-81bd-347d33f50000';
const user_token = '713cc855cc6a21fac2a32f38a30f0888e1c3e05a';
const cloud = new knotCloud(cloud_url, cloud_port, user_uuid, user_token);


var url = 'mongodb://localhost:27017/sensor-perigo'; mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'erro de conexão: '));
db.once('open', function () {
  //estamos conectados
  console.log('Conectado corretamente com o MONGODB');
});

async function main() {
  //Simulando a ativação do botão

 try {
   console.log("Entrei no main");
   await cloud.connect();
   console.log("conectei a Cloud");
   console.log (await cloud.getDevices());

   await cloud.subscribe('71a528376e57080e');

   cloud.on((thing) => {
     console.log(thing['data']['value'])
     if(thing['data']['value'] == true){
       console.log('Botão clicado!!!')
     }
   });
   } catch (err) {
     console.error(err);
   }
}

main();

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', authRouter); //agora fica com / apenas porque quero autenticar antes de qualquer coisa
app.use('/', index);
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
