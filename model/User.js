const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validation: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Minimum password length is 6 characters"],
    maxlength: [16, "Maximum password length is 16 characters"],
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
