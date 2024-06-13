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
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);

module.exports = app;
