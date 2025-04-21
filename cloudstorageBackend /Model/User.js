const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    googleId: { type: String, unique: true, required: true },
    displayName: String,
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true },
    plan: {
        type: String,
        enum: ['Free', 'Premium', 'Business', 'Enterprise'],
        default: 'Free'
    },
    usedStorage: {
        type: Number,
        default: 0
    },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
