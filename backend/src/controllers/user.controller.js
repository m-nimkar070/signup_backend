const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");


//get user controller

const getUser = catchAsync(async (req, res) => {
  let data;

  if (req.params.userId) {
    data = await userService.getUserById(req.params.userId);
  }

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (data.username != req.user.username) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }else{
    res.status(httpStatus.OK).send(data);
  }
});

// Creating new user entry in database
const createUser = catchAsync(async (req, res) => {
  try {
    const body = req.body;
    const newUser = await userService.createUser(body);
    console.log("New user created", newUser);
    res.status(200).json(newUser);
  } catch (error) {
    throw new ApiError(200, "Email already created");
  }
});

module.exports = {
  getUser,
  createUser,
};
