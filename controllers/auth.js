const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" }; // creating an error objects

  // duplicate error code
  if (err.code == 11000) {
    errors.email = "Email already exist, Try Sign In!!";
    return errors;
  }

  // validations errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
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
    // create an instance of a user locally for us and the saves it to the database, so we need to pass in the object that defines the user
    // this is an asynchronous task and it returns a promise
    const newUser = await User.create({ email, password });
    res.status(201).json(newUser);
    console.log(newUser);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("user login");
};
