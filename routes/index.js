'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/userform.html');
    }
});

router.get('/userform.html', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
})

module.exports = router;