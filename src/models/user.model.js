const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: true,
            min: 0
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
