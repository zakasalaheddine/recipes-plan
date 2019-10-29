const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 55
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    role: {
        type: String,
        required: true,
        default: 'User',
    },
    bloqued: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema, 'Users');