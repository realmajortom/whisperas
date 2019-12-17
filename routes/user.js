require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Journal = require('../models/journalModel');

const genErrMsg = 'A server error occurred, please try again';

const router = express.Router();

// Register new user
router.post('/register', (req, res) => {

	if (req.body.prefname.length < 1 || req.body.prefname.length > 60) {
		res.json({message: 'Preferred Name must contain between 1 & 60 characters', success: false})
	} else if (req.body.username.length < 4 || req.body.username.length > 60) {
		res.json({message: 'Username must contain between 4 & 60 characters', success: false})
	} else if (req.body.pass.length < 8 || req.body.pass.length > 60) {
		res.json({message: 'Password must contain between 8 & 60 characters', success: false})
	} else if (req.body.pass === req.body.username || req.body.pass === req.body.prefname) {
		res.json({message: 'Yowza, you crazy!! Account not created', success: false});
	} else {

		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				res.json({message: genErrMsg, success: false});

			} else if (user) {
				res.json({message: 'Username already taken', success: false});

			} else {

				bcrypt.hash(req.body.pass, 12, (err, hash) => {
					if (err) {
						res.json({message: genErrMsg, success: false});
					} else {
						User.create({
							prefname: req.body.prefname,
							username: req.body.username,
							password: hash
						}, (err, user) => {
							if (err) {
								res.json({message: genErrMsg, success: false});
							} else {
								User.findOne({username: user.username}).then(user => {

									Journal.create({
										authorID: user._id
									});

									const token = jwt.sign({
										sub: user._id,
									}, process.env.JWT_SECRET, {expiresIn: '30d'});

									res.json({token: token, prefname: user.prefname, success: true});

								});
							}
						});
					}
				});
			}
		});
	}
});


// login existing user
router.post('/login', (req, res) => {
	if (req.body.username.length < 4 || req.body.username.length > 60) {
		res.json({message: 'Hint: Your username contains between 4 & 60 characters :)', success: false})
	} else if (req.body.pass.length < 8 || req.body.pass.length > 60) {
		res.json({message: 'Hint: Your password contains between 8 & 60 characters :)', success: false});
	} else {

		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				res.json({message: genErrMsg, success: false});
			} else if (!user) {
				res.json({message: 'Invalid username', success: false});
			} else {
				bcrypt.compare(req.body.pass, user.password, (err, response) => {
					if (err) {
						res.json({message: genErrMsg, success: false});
					} else if (response === false) {
						res.json({message: 'Incorrect password', success: false});
					} else {

						const token = jwt.sign({
							sub: user._id,
						}, process.env.JWT_SECRET, {expiresIn: '90d'});

						res.json({token: token, prefname: user.prefname, success: true});
					}
				});
			}
		});
	}
});

router.post('/update-un', (req, res) => {
	if (req.body.newUsername.length < 4 || req.body.newUsername.length > 60) {
		res.json({message: 'New username must contain between 4 & 60 characters :)', success: false});
	} else if (req.body.username === req.body.newUsername) {
		res.json({message: 'No updates made', success: false});
	} else {

		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				res.json({message: genErrMsg, success: false});
			} else if (!user) {
				res.json({message: `Cannot find user: ${req.body.username}`, success: false});
			} else {
				bcrypt.compare(req.body.pass, user.password, (err, response) => {
					if (err) {
						res.json({message: genErrMsg, success: false});
					} else if (response === false) {
						res.json({message: 'Incorrect password', success: false});
					} else {
						user.username = req.body.newUsername;
						user.save((err) => {
							if (err) {
								res.json({message: genErrMsg, success: false});
							} else {
								res.json({message: 'Username successfully updated!', success: true});
							}
						});
					}
				});
			}
		});
	}
});

router.post('/update-pn', (req, res) => {
	if (req.body.newPrefname.length < 1 || req.body.newPrefname.length > 60) {
		res.json({message: 'Preferred name must contain between 4 & 60 characters :)', success: false});
	} else {

		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				res.json({message: genErrMsg, success: false});
			} else if (!user) {
				res.json({message: `Cannot find user: ${req.body.username}`, success: false});
			} else {
				bcrypt.compare(req.body.pass, user.password, (err, response) => {
					if (err) {
						res.json({message: genErrMsg, success: false});
					} else if (response === false) {
						res.json({message: 'Incorrect password', success: false});
					} else {
						user.prefname = req.body.newPrefname;
						user.save((err, doc) => {
							if (err) {
								res.json({message: genErrMsg, success: false});
							} else {
								res.json({message: 'Preferred name successfully updated!', success: true});
							}
						});
					}
				});
			}
		});
	}
});

router.post('/update-pass', (req, res) => {

	if (req.body.newPass.length < 8 || req.body.newPass.length > 60) {
		res.json({message: 'Password must contain between 8 & 60 characters :)', success: false});
	} else {

		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				res.json({message: genErrMsg, success: false});
			} else if (!user) {
				res.json({message: `Cannot find user: ${req.body.username}`, success: false});
			} else {
				bcrypt.compare(req.body.pass, user.password, (err, response) => {
					if (err) {
						res.json({message: genErrMsg, success: false});
					} else if (response === false) {
						res.json({message: 'Incorrect password', success: false});
					} else {
						bcrypt.hash(req.body.newPass, 12, (err, hash) => {
							if (err) {
								res.json({message: genErrMsg, success: false});
							} else {
								user.password = hash;
								user.save((err) => {
									if (err) {
										res.json({message: genErrMsg, success: false});
									} else {
										res.json({message: 'Password successfully updated', success: false});
									}
								});
							}
						});
					}
				})
			}
		})
	}
});


module.exports = router;