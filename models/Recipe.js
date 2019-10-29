const mongoose = require('mongoose');
const reviewsSchema = require('./Reviews');

const recipeInfo = mongoose.Schema({
    makingTime: String,
    serving: String,
    cals: String
});

const recipeSchema = mongoose.Schema({
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
    info: {
        type: recipeInfo,
        required: true
    },
    description: String,
    images: [String],
    ingredients: [String],
    directions: [String],
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
    }
}, { timestamps : true });
module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');