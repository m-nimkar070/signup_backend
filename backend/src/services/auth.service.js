const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");


const loginUserWithUsernameAndPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect username or password");
  }
  return user;
};

module.exports = {
  loginUserWithUsernameAndPassword,
};
