const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./config/passport");
const passport = require("passport");

const app = express();
//Cors Policy
app.use(cors());
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.options("*", cors());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);

module.exports = app;
