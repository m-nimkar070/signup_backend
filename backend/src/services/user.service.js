const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

const createUser = async (user) => {
  const userInstance = new User(user);
  try {
    await userInstance.validate();
  } catch (validationError) {
    throw new ApiError(httpStatus.BAD_REQUEST, validationError.message);
  }
  // Check if username is already taken :
  if (await User.isUserNameTaken(user.username)) {
    throw new ApiError(httpStatus.OK, "Username already taken");
  }
  // Store the hashedPassword
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Create the user with User.create
  const userBody = await User.create({ ...user, password: hashedPassword });
  console.log(userBody);
  return userBody;
};

const getUserByUsername = async (username) => {
  // Function Implementation here
  return User.findOne({ username });
};

module.exports = { createUser, getUserByUsername };
