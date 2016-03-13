var mongoose = require('mongoose');
var _ = require('lodash');
var Book = mongoose.model('Book');

/**
 * List
 */
exports.all = function(req, res) {
  Book.find({}).exec(function(err, books) {
    if(!err) {
      res.json(books);
    }else {
      console.log('Error in first query');
    }
  });
};

/**
 * List from a library
 */
exports.library = function(req, res) {
  Book.find({library: req.params.id, available: true}).exec(function(err, books) {
    if(!err) {
      res.json(books);
    }else {
      console.log('Error in first query');
    }
  });
};

/**
 * Add a Book
 */
exports.add = function(req, res) {
  req.body.library = req.params.id;
  Book.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send('OK');
  });
};

/**
 * Update a Book
 */
exports.remove = function(req, res) {
  var query = { id: req.params.id, available:true};
  console.log(req.params.id)

	Book.findOneAndUpdate(query, {$set: {available: false, removed: new Date()}}, function(err, data) {
	  if(err) {
	    console.log('Error on save!');
      console.log(err);
	    res.status(500).send('We failed to save to due some reason');
	  } else {
      res.status(200).send('Updated successfully');
    }
	  
	});

};

/**
 * Remove a book
 */
exports.delete = function(req, res) {
  var query = { id: req.params.id };
  Book.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    res.status(200).send('Removed Successfully');
  });
};