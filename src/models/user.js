const mongoose = require('mongoose');

const validator = require('validator');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
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

userSchema.methods.getJwtToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DevTinderSecret");
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const User = mongoose.model('User', userSchema);

module.exports = User;