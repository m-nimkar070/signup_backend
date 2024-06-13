const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");


const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (err.name === 'ValidationError') {
        statusCode = httpStatus.BAD_REQUEST;
        message = Object.values(err.errors).map(error => error.message).join(', ');
    }

    if (!statusCode) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    res.locals.errorMessage = message;

    const response = {
        code: statusCode,
        message:message || 'Internal Server Error',
        ...(config.env === "development" && { stack: err.stack }),
    };

    if (config.env === "development") {
        console.error(err);
    }

    res.status(statusCode).send(response);
};

module.exports = {
    errorHandler,
};