const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Token = "L@veThi$Girl"
const fetchuser = require('../middleware/fetchuser')
//Route :1 Authenticate by creating user of user http://localhost:5000/api/auth/creteuser
router.post("/createuser" ,[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid Password').isLength({ min: 5 }),
] ,async(req,res)=>{
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // if there are error occurred
  let user = await User.findOne({email : req.body.email})
  if(user){
    return res.status(400).json({error:"Sorry user with same email already exist"})
  }

  const salt = await bcrypt.genSalt(10);
  const secPass= await bcrypt.hashSync(req.body.password, salt)
    // create new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    //   .then(user => res.json(user))
    //   .catch(err =>{console.log(err)
    // res.json({Error :'Please enter Unique value for email'})})
    // console.log(req.body)
    // const user = User(req.body)
    // user.save()
    // res.send(req.body)
    const data = {
      user : {
        id : user.id
      }
    }
    const authentication = jwt.sign(data,JWT_Token)
    res.send({authentication})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured")
  }
})
//Route :2 Authenticate by login of user http://localhost:5000/api/auth/login
router.post("/login" , [
  body('email','Enter a valid email').isEmail(),
  body('password','password cannot be blank').exists(),
] , async(req,res) => {
//if there are errors,it return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email,password } = req.body;
  let user = await User.findOne({email})
  try {
    if (!user) {
      return res.status(400).json({error:"Please enter correct password or email"})
    }
    let userPassword = await bcrypt.compare(password,user.password)
    if (!userPassword) {
      return res.status(400).json({error:"Please enter correct password or email"})
    }
    const data = {
      User : {
        id : user.id
      }
    }    
    const authentication = jwt.sign(data,JWT_Token)
    res.send({authentication})
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Occurred")    
  }
})
//Route :3 Authenticate by creating user of user http://localhost:5000/api/auth/getuser
router.post('/getuser',fetchuser
, async(req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findOne({userId}).select("-password");
    res.send(user)
  } catch (error) {
  console.error(error.message)
  res.status(500).send("Internal Server Occurreds")    

}
})
module.exports=router
