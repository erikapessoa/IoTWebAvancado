var express = require('express');
var authRouter = express.Router();



/* GET users listing. */
authRouter.get('/auth', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
});

module.exports = authRouter;
