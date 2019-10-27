const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({

	// Split date to simplify trend analysis. Values from client tz
	date: Number,              // 1-31
	month: Number,            // 1-12
	year: Number,             // 2019
	day: String,          // S,M,T,W,T,F,S
	dmy: String,

	// User Responses
	genScore: Number,         // On scale of 1-5, how was your day?
	healthScore: Number,      // On scale of 1-5, how was your health today?
	wins: [String],           // Up to 3. From controlled list
	setbacks: [String],       // Up to 3. From controlled list
	treatChanges: [String],   // Treatment changes (if any)
	comment: {                // Comments (if any). No longer than a tweet
		type: String,
		maxLength: 140
	}
},
	{
		timestamps: true
	});


const journalSchema = mongoose.Schema({
	authorID: {
		type: String,
		required: true
	},
	entries: [entrySchema]
},
	{
		collection: 'journals',
		timestamps: true
	});

module.exports = mongoose.model('Journal', journalSchema);