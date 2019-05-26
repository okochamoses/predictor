const express = require("express");
const router = express.Router();
const userService = require("../services/userService")


router.post("/register", userService.register);

module.exports = router;
