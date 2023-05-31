const mongoose = require('mongoose')

const profileSchema = mongoose.Schema (
    {
          age: {
            type: Number,
            // required: [true, "Please add the contact name"],
          },
          gender: {
            type: String,
            // required: [true, "Please add the contact email address"],
          },
          address: {
            type: String,
            // required: [true, "Please add the contact phone number"],
          },
          employment: {
            type: String,
            // required: [true, "Please add the contact phone number"],
          },
    },
    {
        timestamps: true,
    }
  
)

module.exports = mongoose.model("Profile", profileSchema)