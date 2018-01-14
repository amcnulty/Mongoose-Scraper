'use strict'

const db = require('../config/dbSetup');

const first = values => values[0];
const rest = values => values.slice(1);
let recordCounter = 0;

const insertRecords = function(articleData, cb) {
  recordCounter = 0;
  addToDB(articleData, function(err) {
    cb(err, recordCounter);
  });
}

const articleExists = function(record, cb) {
  db.Article.findOne({ 'heading': record.heading }, function(err, record) {
    if (err) console.log(err);
    else if (record) cb(true);
    else cb(false);
  });
}

const addToDB = function(articleData, cb) {
  const record = first(articleData);
  const remaining = rest(articleData);
  articleExists(record, function(exists) {
    if (!exists) {
      db.Article.create(record, function(err) {
        if (err) cb(err);
        else if (remaining.length === 0) {
          recordCounter++;
          cb(null, recordCounter);
        }
        else {
          recordCounter++;
          addToDB(remaining, cb);
        }
      });
    }
    else {
      if (remaining.length === 0) cb(null, recordCounter);
      else addToDB(remaining, cb);
    }
  });
}

module.exports = {
  insertRecords: insertRecords
}