const express = require('express');
const router = express.Router();
const passport = require('passport');
const Journal = require('../models/journalModel');
require('../passport');
router.use(passport.initialize());


router.post('/submit', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (user) {

			Journal.findOne({authorID: user._id}, (err, doc) => {

				if (err) {return res.json({message: 'An error occurred. Please try again.', success: false});}

				else if (user.username !== 'tggir1' && doc.entries.length > 0 && doc.entries[0]['dmy'] === req.body.dmy) {
					return res.json({message: 'Looks like you already made an entry today!', success: false, code: 1});
				}

				else {
					doc.entries.unshift(req.body);
					doc.save((err, doc) => {
						if (err) {
							return res.json({message: 'An error occurred. Please try again.', success: false, code: 2});
						} else {
							return res.json({doc: doc.entries[0], message: 'Entry successfully saved!', success: true});
						}
					});
				}

			});
		} else {
			return res.json({message: 'An error occured. Please try again', success: false, code: 3});
		}
	})(req, res);
});


// Get entries to display in history or trends
router.get('/my-entries', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {
		if (user) {

			Journal.findOne({authorID: user._id}, (err, doc) => {
				if (err) {
					return res.json({message: 'An error occurred. Please try again.', success: false, code: 1});
				} else if (doc === null) {
					return res.json({message: "It appears that you haven't made an entries yet!", success: false});
				} else {
					return res.json({entries: doc.entries, success: true});
				}
			})
		} else {
			return res.json({message: 'An error occured. Please try again', success: false, code: 2});
		}
	})(req, res);
});


router.post('/delete/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {
		if (user) {
			Journal.findOne({authorID: user._id}, (err, doc) => {
				if (err) {
					return res.json({message: 'An error occurred. Please try again.', success: false});
				} else if (doc === null) {
					return res.json({message: "It appears that you haven't made an entries yet!", success: false});
				} else {
					doc.entries.id(req.params.id).remove();
					doc.save((err, doc) => {
						if (err) {
							return res.json({message: 'An error occurred. Please try again.', success: false});
						} else {
							return res.json({entries: doc.entries, message: 'Entry successfully removed!', success: true});
						}
					})
				}
			});
		} else {
			return res.json({message: 'An error occured. Please try again', success: false, code: 2});
		}
	})(req, res);
});

module.exports = router;