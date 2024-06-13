const Joi = require("joi");
const { objectId,password } = require("./custom.validation");


const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobNumber: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  getUser,
  createUser
};
