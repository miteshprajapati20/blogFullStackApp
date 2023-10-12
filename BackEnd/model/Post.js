const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../model/User')

const PostSchema = new mongoose.Schema({

    title: {
        type: String
    },
    summary: {
        type: String
    },
    content: {
        type: String
    },
    cover: {
        type: String
    },
    
    author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Post", PostSchema);