const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    walletID: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

module.exports = walletSchema;
