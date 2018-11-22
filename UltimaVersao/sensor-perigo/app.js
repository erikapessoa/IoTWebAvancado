var createError = require('http-errors');
var express = require('express');
var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')
var configDB = require('./config/database.js');
var configKnot = require('./config/knotinfo.js');

const knotCloud = require('knot-cloud'); //https://github.com/CESARBR/knot-lib-node

var app      = express();

mongoose.connect(configDB.url);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(session({secret: 'sensorperigo'}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//ORDEM IMPORTA!!!
require('./config/passport')(passport);
require('./routes/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);

//teste conexão com o Knot

const cloud = new knotCloud(configKnot.cloud_url, configKnot.cloud_port,
                  configKnot.user_uuid, configKnot.user_token);

async function main() {
  //Simulando a ativação do botão

 try {
   console.log("Entrei no main");
   await cloud.connect();
   console.log("conectei a Cloud");
   console.log (await cloud.getDevices());

   console.log(await cloud.getDevice('6784431f6e9656e9'));

   console.log(await cloud.subscribe('6784431f6e9656e9'));

   cloud.on((thing) => {
     console.log(thing['data']['value'])
     if(thing['data']['value'] == true){
       console.log('Botão clicado!!!')
     }
   });
   } catch (err) {
     console.log("Entrei no catch");
     console.error(err);
   }
}

main();



module.exports = app;
