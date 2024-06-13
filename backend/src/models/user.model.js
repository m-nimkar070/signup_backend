const mongoose = require("mongoose");
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: (value) => validator.isAlpha(value),
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      validate: (value) => validator.isAlpha(value),
    },
    mobNumber: {
      type: String,
      required: true,
      trim: true,
      validate: [
        {
          validator: (value) => validator.isMobilePhone(value),
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
        {
          validator: (value) => value.length === 10,
          message: (props) => `${props.value} must be exactly 10 digits long!`,
        },
      ],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [
        {
          validator: (value) => /^[a-zA-Z]/.test(value) && /\d/.test(value),
          message: (props) =>
            `${props.value} must start with alphabet and must be alphanumeric`,
        },
      ],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @param {string} username - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUserNameTaken = async function (username) {
  return this.findOne({ username: username }).then(function (result) {
    return result !== null;
  });
};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports.User = User;
