'use strict'

const db = require('../model');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {});

module.exports = db;