const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 60
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    bloqued: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps : true });

module.exports = mongoose.model('Category', categorySchema, 'categories');