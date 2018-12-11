'use strict';

var Message = require('../models/message');
var User = require('../models/user');
var passport = require('passport');

exports.get_all_messages = function (req, res, next) {
    if (req.isAuthenticated()) {
        Message.find({}, (err, messages) => {
            res.json(messages);
        });
    } else {
        res.status(401).send("autherror");
    }
}

exports.new_message = function (req, res, next) {
    if (req.isAuthenticated()) {
        req.body.date = new Date();
        req.body.user = req.session.passport.user;
        var message = new Message(req.body);
        //Save new message to database
        message.save(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                //On success send message to everyone
                req.app.io.emit('message', message);
                res.status(201).send("Success");
            }
        });
    } else {
        res.status(401).send("autherror");
    }
}