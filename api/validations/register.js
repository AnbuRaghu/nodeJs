const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateRegisterInput(data) {
  const error = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isLength(data.name, { min: 2, max: 30 })) {
    error.name = "Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    error.name = "Name is required";
  }
  if (validator.isEmpty(data.email)) {
    error.email = "Email is required";
  }
  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    error.password = "Password is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    error.password = "Password must be atleast 6 character";
  }
  if (validator.isEmpty(data.password2)) {
    error.password2 = "Confirm Password field is required";
  }
  if (!validator.equals(data.password, data.password2)) {
    error.password2 = "Password must match";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
