const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
		username: {
			type: String,
			minLength: 4,
			maxLength: 60,
			trim: true,
			required: true
		},
		password: {
			type: String,
			minLength: 8,
			maxLength: 60,
			trim: true,
			required: true
		},
		prefname: {
			type: String,
			minLength: 1,
			maxLength: 60,
			trim: true,
			required: true
		}
	},
{
	collection: 'users',
	timestamps: true
});


module.exports = mongoose.model('User', userSchema);