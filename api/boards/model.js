var mongoose = require('mongoose');
var Card = require('../cards/model');

var BoardSchema = new mongoose.Schema({
    title: String,
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        default: []
    }]
});

module.exports = mongoose.model('Board', BoardSchema);