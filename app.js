require('@google-cloud/trace-agent').start();
require('@google-cloud/profiler').start();
require('@google-cloud/debug-agent').start();

require('dotenv').config();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const winston = require('winston');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const {LoggingWinston} = require('@google-cloud/logging-winston');

const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');


const app = express();
const PORT = process.env.PORT;


const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
	level: 'info',
	transports: [
		new winston.transports.Console(),
		loggingWinston
	],
});
logger.error('Winston error!');
logger.info('Winston info');


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}).catch(error => console.log(`Initial connection error: ${{error}}`));
const db = mongoose.connection;
db.once('open', () => console.log('Successfully connected to database'));
db.on('error', err => console.error.bind(console, `Database runtime error: ${err}`));


// https upgrade - disable in App Engine Standard Env
app.set('trust proxy', true);
app.use((req, res, next) => {
	if (req.secure) {
		next();
	} else {
		res.redirect('https://' + req.headers.host + req.url);
	}
});


app.use(express.static(path.join(__dirname, 'build')));


app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


const regLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 10
});

const userLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 100
});

const journalLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 200
});

app.use('/api/user/register', regLimiter);
app.use('/api/user', userLimiter);
app.use('/api/journal', journalLimiter);


app.use('/api/user', userRoutes);
app.use('/api/journal', journalRoutes);


app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));