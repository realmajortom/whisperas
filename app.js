require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');


const express = require('express');
const path = require('path');
const app = express();


const API_PORT = process.env.API_PORT;


// Serve index file
app.use(express.static(path.join(__dirname, 'build'))); // app.use(express.static('build'));


// Rate limiters
const regLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 10
});

const userLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 60
})

const journalLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 200
});

app.use('/api/user/register', regLimiter);
app.use('/api/user', userLimiter);
app.use('/api/journal', journalLimiter);


// Security packages
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
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
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(API_PORT, () => console.log(`Listening on port: ${API_PORT}`));