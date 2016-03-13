var mongoose = require('mongoose');
var _ = require('lodash');
var Library = mongoose.model('Library');


exports.all = function(req, res) {
  Library.find({}).exec(function(err, libraries) {
    if(!err) {
      res.json(libraries);
    }else {
      console.log('Error in first query');
    }
  });
};

/**
 * Add a Library
 */
exports.add = function(req, res) {
  Library.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send('OK');
  });
};

/**
 * Update a Library
 */
exports.update = function(req, res) {
  var query = { id: req.params.id };
  var omitKeys = ['id', '_id', '_v'];
  var data = _.omit(req.body, omitKeys);
  data.updated = Date.now;

	Library.findOneAndUpdate(query, data, function(err, data) {
	  if(err) {
	    console.log('Error on save!');
	    res.status(500).send('We failed to save to due some reason');
	  }
	  res.status(200).send('Updated successfully');
	});

};

/**
 * Remove a Library
 */
exports.remove = function(req, res) {
  var query = { id: req.params.id };
  Library.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    res.status(200).send('Removed Successfully');
  });
};


