const validator = require("validator");
const is_empty = require("./is-empty");

const validateLogin = data => {
  let errors = {};
  const specialChars = new RegExp("[-@$_.]+");
  const uppercase = new RegExp("/[A-Z]+");
  const lowercase = new RegExp("/[a-z]+");
  const numeric = new RegExp("/\d/");

  // Username
  if (data.username < 3) {
    errors.username = "Username does not exist";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field cannot be empty";
  }

  // Password
  if (data.password < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field cannot be empty";
  }

  const empty = is_empty(errors);

  return { errors, empty };
};

module.exports = validateLogin;
