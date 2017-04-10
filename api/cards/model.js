var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
	title: String,
	user: String
});

module.exports = mongoose.model('Card', CardSchema);