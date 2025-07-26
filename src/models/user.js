const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email format');
            }
        }
    },
    password: {
        type: String,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error('Password must be strong');
            }
        }
    },
    photoUrl: {
        type: String,
        validate(value) {
            if (value && !validator.isURL(value)) {
                throw new Error('Invalid URL format');
            }
        }
    },
    gender: {
        type: String,
    },
    skills: {
        type: [String],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;