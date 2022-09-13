const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Token = "L@veThi$Girl"
const fetchuser = require('../middleware/fetchuser')
//Route :1 Authenticate by creating user of user http://localhost:5000/api/auth/creteuser
router.post("/createuser", [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid Password').isLength({ min: 5 }),
], async (req, res) => {
  let success;
  console.log(req.email)
  console.log(req.name)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    // if there are error occurred
    let userExist = await User.findOne({ email: req.body.email })
    if (userExist) {
      success = false
      return res.status(400).json({ error: "Sorry user with same email already exist" })
    }
    console.log("User Exist" +userExist)
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hashSync(req.body.password, salt)
    // create new user
    const user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    console.log("HEllo" + user._id)
    const authentication = jwt.sign({ _id: user._id }, JWT_Token)
    success = true
    res.json({ success, authentication, user })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})
//Route :2 Authenticate by login of user http://localhost:5000/api/auth/login
router.post("/login", [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  //if there are errors,it return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let userIfPresent = await User.findOne({ email: email })
    let success;

    console.log(userIfPresent)

    if (!userIfPresent) {
      success = false;
      return res.status(400).json({ error: "Please enter correct password or email" })
    }

    let userPassword = await bcrypt.compare(password, userIfPresent.password)
    if (!userPassword) {
      success = false
      return res.status(400).json({ error: "Please enter correct password or email" })
    }
    
    const authentication = jwt.sign({_id:userIfPresent._id}, JWT_Token)
    success = true
    res.json({ success: true, authentication:authentication,userIfPresent:userIfPresent })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Occurred")
  }
})
//Route :3 Authenticate by creating user of user http://localhost:5000/api/auth/getuser
router.post('/getuser', fetchuser
  , async (req, res) => {
    try {
      const userId = req.user;
      console.log(userId)
      const user = await User.findById({_id:userId._id }).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Occurreds")

    }
  })
module.exports = router
