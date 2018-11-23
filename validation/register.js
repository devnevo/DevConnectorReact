const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
<<<<<<< HEAD
<<<<<<< HEAD
    errors.name = "Name must be between 2 and 30 characters";
=======
    errors.name = "name must be between 2 and 30 characters";
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
    errors.name = "Name must be between 2 and 30 characters";
>>>>>>> origin/develop
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
<<<<<<< HEAD
<<<<<<< HEAD
    errors.password = "Password field if missing";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password field if missing";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be of length 6 to 30 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Confirm password does not match the password";
=======
    errors.password = "password field if missing";
=======
    errors.password = "Password field if missing";
>>>>>>> origin/develop
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password field if missing";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be of length 6 to 30 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
<<<<<<< HEAD
    errors.name = "confirm password does not match the password";
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
    errors.password2 = "Confirm password does not match the password";
>>>>>>> origin/develop
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
