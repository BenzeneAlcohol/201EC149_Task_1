const mongoose = require('mongoose');
const User = require('./User');
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: [{
        type: String
    }],
    likes: {
        type: Number,
        default: 0
    },
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;