const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, 'Enter First Name'],
    },
    lname: {
      type: String,
      required: [true, 'Enter Last Name'],
    },
    email: {
      type: String,
      required: [true, 'Enter Email'],
      unique: true,
    },
    username: {
      type: String,
    },
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      select:false,
    },
    address: {
      type: String,
    },
    token: {
      type: String,
    },
    // regdAt: { type: Date, default: Date.now },
  },
  { timeStamps: true }
);

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  const comp = await bcrypt.compare(enteredPassword, this.password);
  return comp;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
