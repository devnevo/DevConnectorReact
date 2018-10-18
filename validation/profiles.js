const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Enter a valid Email Id";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field if missing";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "password field if missing";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be of length 6 to 30 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.name = "confirm password does not match the password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
