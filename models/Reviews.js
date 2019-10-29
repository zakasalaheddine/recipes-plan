const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
}, { timestamps : true });