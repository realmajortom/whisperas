require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/userModel');

const opts = {
	secretOrKey: process.env.SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
	jsonWebTokenOptions: {
		maxAge: '30d'
	}
}

passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
	User.findById(jwt_payload.sub, (err, user) => {
		if (err) {
			return done(err, false);
		} else if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	})
}));