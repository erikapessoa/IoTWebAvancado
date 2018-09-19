var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Contact = require('../models/contact');

var contactRouter = express.Router();
contactRouter.use(bodyParser.json());

contactRouter.route('/')
  .get(function (req, res, next) {
    Contact.find({}, function(err, contact) {
      if(err) throw err;
      res.json(contact);
    });
  })
   .post(function (req, res, next) {
     Contact.create(req.body, function (err, contact) {
       if(err) throw err;
       console.log('Criou contato');
       var id = contact._id; //padrão para acessar o id de qualquer documento/item de uma tabela

       res.writeHead(200, {
         'Content-Type': 'text/plain'
       });
       res.end('Contato cadastrado: ' + id);
     });
   })
   .delete(function (req, res, next) {
     Contact.remove({}, function (err, resp) {
       if (err) throw err;
       res.json(resp);
     });
   });

 contactRouter.route('/:email')
   .get(function (req, res, next) {
     Contact.find({emailContactOwner: req.params.email}, function( err, contact) {
       if(err) throw err;
       res.json(contact);
     });
   });


contactRouter.route('/id/:contactId')
  .get(function (req, res, next) {
    Contact.findById(req.params.contactId, function( err, contact) {
      if(err) throw err;
      res.json(contact);
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

  module.exports = contactRouter;
