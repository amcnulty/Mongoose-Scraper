'use strict'

const db = require('../model');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {});

module.exports = db;