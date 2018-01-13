'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  heading: String,
  summary: String,
  link: String,
  saved: {
    type: Boolean,
    default: false
  }
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;