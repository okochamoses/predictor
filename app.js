const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./config/logger");
const dotenv = require("dotenv");
const passport = require("./config/passport");

// Read environment variables from .env file
dotenv.config();

// Database Connection
require("./config/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

// Passport
app.use(passport.initialize());

app.use(morgan("combined", { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/auth", authRouter);
app.use("/users",  passport.authenticate("customer", {session: false, failureRedirect: "/api" }), usersRouter);

module.exports = app;
