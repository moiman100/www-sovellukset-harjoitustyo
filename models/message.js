'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        date: Date,
        text: String,
        user: String
    }
);

module.exports = mongoose.model('Message', MessageSchema);