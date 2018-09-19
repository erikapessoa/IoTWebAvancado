var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../models/user');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

var contactRouter = express.Router();
contactRouter.use(bodyParser.json());

userRouter.route('/')
  .get(function (req, res, next) {
    User.find({}, function(err, user) {
      if(err) throw err;
      res.json(user);
    });
  })
   .post(function (req, res, next) {
     User.create(req.body, function (err, user) {
       if(err) throw err;
       console.log('Criou usuário');
       var id = user._id; //padrão para acessar o id de qualquer documento/item de uma tabela

       res.writeHead(200, {
         'Content-Type': 'text/plain'
       });
       res.end('Pessoa cadastrada: ' + id);
     });
   })
   .delete(function (req, res, next) {
     User.remove({}, function (err, resp) {
       if (err) throw err;
       res.json(resp);
     });
   });

 userRouter.route('/:userEmail')
   .get(function (req, res, next) {
     User.find({email: req.params.userEmail}, function( err, user) {
       if(err) throw err;
       res.json(user);
     });
   });


userRouter.route('/:userId')
  .get(function (req, res, next) {
    User.findById(req.params.userId, function( err, user) {
      if(err) throw err;
      res.json(user);
    });
  });



/*  .put(function (req, res, next) {
    Books.findByIdAndUpdate(req.params.bookId, {
      $set: req.body
    } , {new: true
    }, function (err, book) {
      if(err) throw err;
      res.json(book);
    });
  })
  .delete( function (req, res, next) {
    Books.findByIdAndRemove (req.params.bookId, function (err, resp) {
      if(err) throw err;
      res.json(resp);
    });
  });
*/

  module.exports = userRouter;
