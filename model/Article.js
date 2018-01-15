'use strict'

const mongoose = require('mongoose');
const Comment = require('./Comment');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  heading: String,
  summary: String,
  link: String,
  saved: {
    type: Boolean,
    default: false
  },
  comments: [
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "Comment"
    // }
    Comment.CommentSchema
  ]
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;