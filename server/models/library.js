/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var LibrarySchema = new mongoose.Schema({
  id: String,
  lat: Number,
  lon: Number,
  name: String,
  desc: String,
  capacity: {type:Number, min: 0, max: 100, default: 20},
  picture: {type:String},
  updated: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Library' collection in the MongoDB database
Library = mongoose.model('Library', LibrarySchema);
