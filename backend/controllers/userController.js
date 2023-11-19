require("../db");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../auth/async");
const ErrorResponse = require("../auth/ErrorResponse");
// const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator')

//--------------------------REGISTER USER-----------------
const userSignup = asyncHandler(async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const password = data.password;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array({ onlyFirstError: true })
      res.status(203).json({ success: false , error: error })
    }
    else {
      const hash = await bcrypt.hash(password, 7);
      const uNameE = data.email.substring(0, data.email.indexOf("@"));
      let user = new User({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        username: uNameE,
        mobile: data.mobile,
        password: hash,
        address: data.address
      });
      user
        .save()
        .then((topic) => {
          res.status(200).json({
            success: true,
            message: "User Registered Successfully!!!",
            data: topic,
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: err,
          });
        });
    }
  });

  //--------------------------LOGIN-----------------

const userLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    if (!username || !password) {
      return res.status(422).json({ message: "please provide username and password" })
    }
  
    // Check user
    const user = await User.findOne({ username: username }).select("+password");
    //because in password field we have set the property select:false , but here we need as password so we added + sign
  
    if (!user) {
      return res.status(201).json({
        success: false,
        message: "Invalid credentails user",
      });
    }
    else if (user) {
      console.log("its here1")
      const compare = await user.matchPassword(password);
      if (!compare) {
        return res.status(201).json({
          success: false,
          message: "Invalid credentails",
        });
      } else {
        sendTokenResponse(user, 200, res);
      }
    }
  });

  const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
  
    const options = {
      //Cookie will expire in 30 days
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    // Cookie security is false .if you want https then use this code. do not use in development time
    // if (process.env.NODE_ENV === "proc") {
    //   options.secure = true;
    // }
  
    //we have created a cookie with a token
    res
      .status(statusCode)
      .cookie("token", token, options) // key , value ,options
      .json({
        success: true,
        token,
        message: "Login Successfull",
        usertype: user.usertype,
      });
  };

  //--------------------------LOGOUT-----------------
const Logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      data: "User Logged Out",
    });
  });


  module.exports = {
    userSignup,
    userLogin,
    Logout
  }