/* eslint-disable quotes */
//Set up mongoose connection
const mongoose = require('mongoose')
const mongoDB = "mongodb+srv://testfilm:admin321@cluster0.pwjzz4u.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
module.exports = mongoose
