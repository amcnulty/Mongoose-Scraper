'use strict'

const db = require('../config/dbSetup');

const addComment = function(data, cb) {
  db.Article.findById(data.id,
  function (err, article) {
    if (err) cb(err);
    else {
      const comment = new db.Comment({
        name: data.name,
        email: data.email,
        comment: data.comment
      });
      article.comments.push(comment);
      article.save(function () {
        cb(null);
      });
    }
  });
}

const getComments = function(articleId, cb) {
  db.Article.findById(articleId, function(err, article) {
    if (err) cb(err);
    else {
      cb(null, article.comments);
    }
  });
}

const deleteComment = function(articleId, commentId, cb) {
  db.Article.findById(articleId, function(err, article) {
    if (err) cb(err);
    else {
      article.comments.id(commentId).remove();
      article.save(function(err) {
        if (err) cb(err);
        else cb(null);
      });
    }
  });
}

module.exports = {
  addComment: addComment,
  getComments: getComments,
  deleteComment: deleteComment
}