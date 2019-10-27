// Packages
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Router modules
const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');


// Declare app
const app = express();
const API_PORT = process.env.API_PORT;


//MongoDB connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
	.catch(error => console.log(`Initial connection error: ${{error}}`));

const db = mongoose.connection;

db.once('open', () => console.log('Successfully connected to database'));

db.on('error', err => console.error.bind(console, `Database runtime error: ${err}`));


// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());


// Route middleware
app.use('/user', userRoutes);
app.use('/journal', journalRoutes);


// Catch undirected erroneous routes ... this will change when app is deployed to gcloud
app.get('/', (req, res) => res.json({message: 'Busted by the catch-all'}));


// Listen
app.listen(API_PORT, () => console.log(`Listening on port: ${API_PORT}`));