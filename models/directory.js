var mongoose = require('mongoose');
// below are the fields in the form for entereing a directory in the DB
var directorySchema = new mongoose.Schema({
	name: String,
	phone: String,
	location: String,
	website: String,
    price:String,
	hours: String
});

module.exports = mongoose.model('Directory',directorySchema);