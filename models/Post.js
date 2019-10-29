const mongoose = require('mongoose');
const reviewsSchema = require('./Reviews');

const postSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        max: 255,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    reviews: [reviewsSchema],
    accepted: {
        type: Boolean,
        required: true,
        default: false
    },
    bloqued: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps : true });

module.exports = mongoose.model('Post', postSchema, 'posts');