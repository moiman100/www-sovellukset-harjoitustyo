'use strict';

var express = require('express');
var router = express.Router();
var message_controller = require('../controllers/messageController');
var user_controller = require('../controllers/userController');

//GET request for list of all messages
router.get('/all_messages', message_controller.get_all_messages);

//POST request to create Message
router.post('/new_message', message_controller.new_message);

//POST request to login
router.post('/login', user_controller.login);

//GET request to logout
router.get('/logout', user_controller.logout);

//POST request to register
router.post('/register', user_controller.register);

module.exports = router;