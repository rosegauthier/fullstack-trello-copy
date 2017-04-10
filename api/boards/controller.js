var Board = require('./model.js');
var Card = require('../cards/model.js');

exports.index = function(req, res) {
	Board.find()
	.populate('cards').exec()
	.then(boards => res.send(boards));
};

exports.create = function(req, res) {
	var board = new Board;
	board.title = req.body.title;
	board.cards = [];
	board.save()
	.then(board => res.send(board));
};

exports.createCard = function(req, res) {
  var board;

  Board.findById(req.params.id)
  .then(b => {
  	board = b;
  	var card = new Card()
    console.log(req.body)
 	  card.title = req.body.title;
    card.user = req.body.user
 	return card.save()
  }).then(card => {
  	board.cards.push(card._id);
  	return board.save();
  }).then(board => res.send(board))
  .catch(err => {
  	console.log(err); 
  	res.status(500);
  	res.send(err.message);
  })
};

exports.destroy = function(req, res) {
	Board.remove({ _id: req.params.id })
	.then(() => res.send('ok'));
};