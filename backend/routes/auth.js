const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// ROUTE : 3 -> CREATE A NEW USER IN DB.
router.post('/create-user', [
  // get these values from request body
  body('name', 'Input your name').isLength({ min: 1 }),
  body('email', 'Email is invalid!').isEmail(),
  body('password', 'Password must be atleast 5 characters long!').isLength({ min: 5 })
], async (req, res) => {
  let user = await User.findOne({ email: req.body.email })

  if (user) {
    return res.status(400).json({ error: "Email already exists!" })
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt)

  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
    budget: req.body.budget
  });
  // .then(user => res.json('user add success..!')).catch(error => {
  //   console.error(error.message);
  //   res.send('Email already exists!')
  // });

  const data = {
    user: {
      id: user.id
    }
  }

  const authToken = jwt.sign(data, 'lewpewmew');
  return res.status(200).json({ authToken })
})

// ROUTE : 2 -> USER LOGIN 
router.post('/login-user', [
  // get these values from request body
  body('email', 'Email is invalid!').isEmail(),
  body('password', 'Password cannot be blank!').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "Email or password is incorrect!" })
    }
    let passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare) {
      return res.status(400).json({ success: false, error: "Email or password is incorrect!" })

    }
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, 'lewpewmew');
    return res.status(200).json({ success: true, authToken: authToken })
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal Server Error" })
  }
})

// ROUTE : 3 -> FETCH USER DETAILS 
router.post('/get-user', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors!")
    
  }
})

// ROUTE : 4 -> UPDATE EXPENSE
router.post('/update-expense', fetchuser, async (req, res) => {
  try {
    const budget = {"budget" : req.body.budget}
    const user = await User.updateOne({ $set: budget})
    res.status(200).send({msg : 'Update Success'})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors!")
    
  }
})

module.exports = router