const express = require("express")
const router = express.Router()
const validateToken = require("../middleware/validateTokenHandler")
const {
  registerAdmin,
  loginAdmin,
  currentAdmin,
} = require("../controllers/adminController")

router.post("/register", registerAdmin)
router.post("/login", loginAdmin)
router.get("/current", validateToken, currentAdmin)

module.exports = router
