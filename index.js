var express = require('express');
var app = express();
// will require special file that stores variables as they would be stored on your terminal
require('dotenv').config();

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');

var Card = require('./api/cards/model');
var Board = require('./api/boards/model');
var User = require('./api/users/model');

var mongoose = require('mongoose');

// TODO: Enter a DB Name for your project
mongoose.connect(process.env.MONGODB_SERVER);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var auth = require('./auth'); 
auth(app);

// Serve bundle.js
app.use(webpackMiddleware(webpack(require('./webpack.config.js'))));

// Serve your API assets here. You'll need to include the post route file.
app.use(express.static('public'));


app.get('/api/users', function(req, res) {
	User.find()
	.then(users => res.send(users));
});

// Include your API routes here
// app.use('/api/name', require('./api/name'));
app.use('/api/boards', require('./api/boards'));
app.use('/api/cards', require('./api/cards'));

// If none of the above matches, serve public/index.html.
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.listen(process.env.PORT || 8080);
