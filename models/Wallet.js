const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    walletID: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0.00
    }
})

module.exports = walletSchema;
