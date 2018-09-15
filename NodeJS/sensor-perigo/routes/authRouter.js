var express = require('express');
var authRouter = express.Router();

/* GET users listing. */
authRouter.get('/', function(req, res, next) {
  res.render('index.ejs');
});

authRouter.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
});

module.exports = authRouter;
