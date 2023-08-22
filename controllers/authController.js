const User = require("../models/User");

// handling errors comming from db due to validation issues
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  //validation errors
  if (err.message.inclides("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "Email already registered";
    return errors;
  }

  return errors;
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.login_post = async (req, res) => {
  res.send("user login");
};
