const mongoose = require("mongoose");
const Wallet = require("./Wallet");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    accountNumber: {
        type: String
    }, 
    userType: {
        type: String,
        required: true
    }, 
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }, 
    wallet: {
        type: Wallet
    }
})

const User = mongoose.model("users", userSchema);

module.exports = User;
