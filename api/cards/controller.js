var Card = require('../cards/model.js');

exports.index = function(req, res) {
	Card.find()
	.then(cards => res.send(cards));
};

// app.post('/api/cards', function(req, res) {
// 	var card = new Card;
// 	card.title = req.body.title;
// 	card.user = req.body.user;
// 	card.save()
// 	.then(card => res.send(card));
// });

exports.updateUser = function(req, res) {
	Card.findById(req.params.id)
	.then(card => {
		card.user = req.body.user

		card.save()
		.then(function(card) {
		  res.send(card);
		})
		.catch(function(err) {
		  res.send(err);
		});
	})
	.catch(err => {
		console.log(err, 'cant find id');
	});
};

exports.destroy = function(req, res, next) {
	Card.remove({_id: req.params.id})
	.then(() => res.send('ok'))
	.catch(function(err) {
		res.send(err);
	});
};