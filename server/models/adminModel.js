const mongoose = require('mongoose')

const adminSchema = mongoose.Schema (
    {
          username: {
            type: String,
            required: [true, "Please add a username"],
          },
          email: {
            type: String,
            required: [true, "Please add an email"],
            unique: [true, "Email already taken"],
          },
          password: {
            type: String,
            required: [true, "Please add a password"],
          },

    },
    {
        timestamps: true,
    }
  
)

module.exports = mongoose.model("Admin", adminSchema)