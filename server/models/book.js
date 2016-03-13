/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  id: String,
  library: String,
  name: String,
  author: String,
  isbn: String,
  image: String,
  genre: String,
  added: { type: Date, default: Date.now },
  removed: { type: Date, default: Date.now },
  available: {type: Boolean, default:true} 
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Book' collection in the MongoDB database
Book = mongoose.model('Book', BookSchema);