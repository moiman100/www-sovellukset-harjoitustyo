'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
//Attach io to app so it can be used in messsageController
app.io = io;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');

const PORT = 8080;
const HOST = '0.0.0.0';

http.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '9yMDBdrxIK4q4Zr0TkZR',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Serve static content
app.use(indexRouter, express.static('./public'));
//Route api calls
app.use('/api', apiRouter);

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Set up mongoose connection
var mongoDB = 'mongodb://mongo:27017/my_database';
var db = mongoose.connection;
db.on('connecting', function () {
    console.log('Connecting');
});
db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
db.on('connected', function () {
    console.log('Connected!');
});
db.once('open', function () {
    console.log('Connection open');
});
db.on('reconnected', function () {
    console.log('Reconnected');
});
db.on('disconnected', function () {
    console.log('Disconnected');
    console.log('Trying to connect again in 5 seconds')
    console.log('MongoDB url is: ' + mongoDB);
    //Try connecting again in 5 seconds
    setTimeout(() => mongoose.connect(mongoDB, { useNewUrlParser: true, auto_reconnect: true }), 5000);
});
console.log('MongoDB url is: ' + mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true, auto_reconnect: true });
mongoose.Promise = global.Promise;