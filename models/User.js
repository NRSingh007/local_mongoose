const mongoose = require("mongoose");
const { default: validator } = require("validator");
// importing third party validator
const { isEmail } = require("validator");

// creating userSchema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Invalid Email!!, Please enter a valid Email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should be minimum of 8 characters"],
  },
});

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("New user has been created and saved", doc);
  next();
});

// fire a function before a doc was saved to db
userSchema.pre("save", function (next) {
  console.log("User is about to be created and saved", this);   // "this" refer to the local instance of the user before we saved it to the database
  next();
});

// creating model based on the userSchema
// "user" is the call model that define the database collection
const User = mongoose.model("user", userSchema);

module.exports = User;
