var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Button = require('../models/button');

var buttonRouter = express.Router();
buttonRouter.use(bodyParser.json());

buttonRouter.route('/')
  .get(function (req, res, next) {
    Button.find({}, function(err, button) {
      if(err) throw err;
      res.json(button);
    });
  })
   .post(function (req, res, next) {
     Button.create(req.body, function (err, button) {
       if(err) throw err;
       console.log('Criou button');
       var id = button._id; //padrão para acessar o id de qualquer documento/item de uma tabela

       res.writeHead(200, {
         'Content-Type': 'text/plain'
       });
       res.end('Button cadastrado: ' + id);
     });
   })
   .delete(function (req, res, next) {
     Button.remove({}, function (err, resp) {
       if (err) throw err;
       res.json(resp);
     });
   });

 buttonRouter.route('/:email')
   .get(function (req, res, next) {
     Button.find({buttonOwner: req.params.email}, function( err, button) {
       if(err) throw err;
       res.json(button);
     });
   });


buttonRouter.route('/id/:buttonId')
  .get(function (req, res, next) {
    Button.findById(req.params.buttonId, function( err, button) {
      if(err) throw err;
      res.json(button);
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

  module.exports = buttonRouter;
