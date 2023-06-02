const express = require('express')
const router = express.Router()
const {
    getProfiles,
    getCurrentDayProfiles,
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile
}  = require('../controllers/profileController')
 
router.route('/').get(getProfiles).get(getCurrentDayProfiles).post(createProfile)
router.route('/:id').get(getProfile).put(updateProfile).delete(deleteProfile)



module.exports = router