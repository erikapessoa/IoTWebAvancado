var express = require('express');
var bodyParser = require('body-parser');
var testRouter = express.Router();

/* GET home page. */
testRouter.get('/', function(req, res, next) {
  res.render('test', { title: 'Test' });
});

module.exports = testRouter;
