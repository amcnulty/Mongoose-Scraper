'use strict'

const db = require('../config/dbSetup');

const first = values => values[0];
const rest = values => values.slice(1);
let recordCounter = 0;
const findAll = function(cb) {
  db.Article.find({}, function(err, articles) {
    if (err) cb(err);
    else cb(null, articles);
  });
}
/**
 * Inserts records into database from a set of records. Returns
 * the number of unique entries that are added.
 * @fires addToDB()
 * @param {Object[]} articleData - Article data scraped from web
 * @param {Function} cb - Callback function
 */
const insertRecords = function(articleData, cb) {
  recordCounter = 0;
  addToDB(articleData, function(err) {
    cb(err, recordCounter);
  });
}
/**
 * Checks if a record is already in the database. Calls back function with
 * true if record exists and false if record does not exist.
 * @param {Object} record - Record to be checked
 * @param {Function} cb - Callback function
 */
const articleExists = function(record, cb) {
  db.Article.findOne({ 'heading': record.heading }, function(err, record) {
    if (err) console.log(err);
    else if (record) cb(true);
    else cb(false);
  });
}
/**
 * Adds new record to database if it doesn't already exist in the database.
 * Increments the number of unique records added.
 * @fires articleExists()
 * @param {Object[]} articleData - Article data scraped from web
 * @param {Function} cb - Callback function
 */
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
  insertRecords: insertRecords,
  findAll: findAll
}