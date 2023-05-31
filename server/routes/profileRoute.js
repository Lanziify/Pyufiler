const express = require('express')
const router = express.Router()
const {
    getProfiles,
    getCurrentDayProfiles,
    getWeekProfiles,
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile
}  = require('../controllers/profileController')
 
router.route('/').get(getProfiles).get(getCurrentDayProfiles).get(getWeekProfiles).post(createProfile)
router.route('/:id').get(getProfile).put(updateProfile).delete(deleteProfile)



module.exports = router