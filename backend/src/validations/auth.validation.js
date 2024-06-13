const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobNumber: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};


const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  login,
};
