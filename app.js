require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');

const app = express();
const API_PORT = process.env.API_PORT;


// Upgrade connections to https
app.enable('trust proxy');
app.use((req, res, next) => {
	if (req.secure) {
		next()
	} else {
		res.redirect('https://' + req.headers.host + req.url);
	}
});


// Serve index file
app.use(express.static(path.join(__dirname, 'build')));


// Security stuff
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


// Database connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
	.catch(error => console.log(`Initial connection error: ${{error}}`));

const db = mongoose.connection;
db.once('open', () => console.log('Successfully connected to database'));
db.on('error', err => console.error.bind(console, `Database runtime error: ${err}`));


// Api routes
app.use('/api/user', userRoutes);
app.use('/api/journal', journalRoutes);


// Catch all -- redirect to homepage
app.get('/*', function(req, res) {res.sendFile(path.join(__dirname, 'build', 'index.html'))});


app.listen(API_PORT, () => console.log(`Listening on port: ${API_PORT}`));