const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Data Schema
const dataSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    originalname:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User
        required: true
    },
    apikey: {
        type: Schema.Types.ObjectId,
        ref: 'Apikey', // Reference to Apikey (optional)
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Data', dataSchema);
