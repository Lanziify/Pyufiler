//Crud function
//Route Crud operation to /api/profile
//Access public
const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')
const mongoose = require('mongoose')

const getProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find()
  res.status(200).json(profiles)
})

const getCurrentDayProfiles = asyncHandler(async (req, res) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()

  // Filter the profiles based on the current day
  const profiles = await Profile.find({
    createdAt: {
      $gte: new Date(year, month - 1, day),
      $lt: new Date(year, month - 1, day + 1),
    },
  })
  res.status(200).json(profiles)
})

const createProfile = asyncHandler(async (req, res) => {
  const { age, gender, address, employment } = req.body
  if ((!age, !gender, !address, !employment)) {
    res.status(400).json({ message: 'Invalid' })
    return
  }
  const profile = await Profile.create({
    age,
    gender,
    address,
    employment,
  })
  res.status(201).json(profile)
})

const getProfile = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid ID' })
    return
  }
  const profile = await Profile.findById(id)
  if (!profile) {
    res.status(404).json({ message: 'Customer not found' })
    return
  }
  res.status(200).json(profile)
})

const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id)
  if (!profile) {
    res.status(404).json({ message: 'Customer not found' })
    return
  }
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedProfile)
})

const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id)
  if (!profile) {
    res.status(404)
    throw new Error('Customer not found')
  }
  await Profile.deleteOne({ _id: req.params.id })
  res.status(200).json(profile)
})

module.exports = {
  getProfiles,
  getCurrentDayProfiles,
  // getWeekProfiles,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
}
