//Crud function
//Route Crud operation to /api/profile
//Access public
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// Handle admin registration
const registerAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  // Validation
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Fields should not be empty!')
  }
  // Existence checking
  const adminAvailable = await Admin.findOne({ email })
  if (adminAvailable) {
    res.status(400)
    throw new Error('Admin already exist!')
  }
  // Encryption
  const hashedPassword = await bcrypt.hash(password, 10)
  const admin = await Admin.create({
    username,
    email,
    password: hashedPassword,
  })
  // Status
  if (admin) {
    res.status(201).json({ _id: admin.id, email: admin.email })
  } else {
    res.status(400)
    throw new Error('User data is not valid!')
  }
  res.json({ message: 'register admin' })
})

// Handle admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Fields should not be empty!')
  }
  const admin = await Admin.findOne({ email })
  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          username: admin.username,
          email: admin.email,
          id: admin._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    )
    res.status(200).json({ accessToken })
  } else {
    res.status(401)
    throw new Error('Email or Password invalid!')
  }
})

const currentAdmin = asyncHandler(async (req, res) => {
  res.json(req.admin)
})

module.exports = {
  registerAdmin,
  loginAdmin,
  currentAdmin,
}
