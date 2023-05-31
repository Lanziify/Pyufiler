const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectMongoDb = require('./config/dbConnection');
const cors = require('cors')
require('dotenv').config()

connectMongoDb()

const app = express()
const PORT = process.env.PORT || 5000;

// Allow cross-origin requests
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(express.json())

// Routes
app.use('/api/profile', require('./routes/profileRoute'))

// Error handling middleware
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
