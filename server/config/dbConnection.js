const mongoose = require('mongoose')

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("MongoDB connection established successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectMongoDb