const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// API Key Schema
const apiSchema = new Schema({
    cloudname: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true }); 

module.exports = mongoose.model("Apikey", apiSchema);
