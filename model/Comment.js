'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: String,
    email: String,
    comment: String
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {
    CommentSchema: CommentSchema,
    Comment: Comment
}