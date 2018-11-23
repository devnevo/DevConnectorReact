const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }

  if (Validator.isEmpty(data.password)) {
<<<<<<< HEAD
<<<<<<< HEAD
    errors.password = "Password field is missing";
=======
    errors.password = "password field is missing";
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
    errors.password = "Password field is missing";
>>>>>>> origin/develop
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
