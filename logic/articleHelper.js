'use strict'

const db = require('../config/dbSetup');

const first = values => values[0];
const rest = values => values.slice(1);

const insertRecords = function(articleData, cb) {
  const record = first(articleData);
  const remaining = rest(articleData);
  db.Article.create(record, function(err) {
    if (err) cb(err);
    else if (remaining.length === 0) cb(null);
    else insertRecords(remaining, cb);
  });
}

module.exports = {
  insertRecords: insertRecords
}