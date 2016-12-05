var User = require('../models/User.js');

exports.getClicks = function(req, res) {
	User.findOne({
		'github.userId': req.user.github.userId
	}, {
		'_id': false
	}).exec(function(err, result) {
		if (err) {
			throw err;
		}

		res.json(result.nbrClicks);
	});
};

exports.addClick = function(req, res) {
	User.findOneAndUpdate({
		'github.userId': req.user.github.userId
	}, {
		$inc: {
			'nbrClicks.clicks': 1
		}
	}).exec(function(err, result) {
		if (err) {
			throw err;
		}

		res.sendStatus(200);
	});
};

exports.resetClicks = function(req, res) {
	User.findOneAndUpdate({
		'github.userId': req.user.github.userId
	}, {
		'nbrClicks.clicks': 0
	}).exec(function(err, result) {
		if (err) {
			throw err;
		}

		res.sendStatus(200);
	});
};
