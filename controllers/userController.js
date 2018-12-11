'use strict';

var User = require('../models/user');
var passport = require('passport');

exports.login = function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(400).send({ message: 'Invalid username or password.' });
        }
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        })
    })(req, res, next);
}

exports.logout = function (req, res, next) {
    req.logout();
    res.redirect('/');
}

exports.register = function (req, res, next) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            res.status(500).send(err);
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
}