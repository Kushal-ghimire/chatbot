const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const userController = require("../controllers/userController.js");
const { guard } = require("../auth/auth");
const { body } = require('express-validator');


//signup
router.post("/signup", userController.userSignup);

//login
router.post("/login", userController.userLogin);

//Logout
router.get("/logout", userController.Logout);

module.exports = router;