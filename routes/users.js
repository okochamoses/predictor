const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.get("/:id", userService.getUser);
module.exports = router;
