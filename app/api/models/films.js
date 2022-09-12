const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const FilmSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  releasedDate: {
    type: String, //Also keeping this as string instead of date
    trim: true,
    required: true
  },
  rating: {
    type: String, //keeping type as string instead of number because In postman, form-urlencoded, all values are sent as strings
    trim: true,
    required: true,
  },
  review: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true,
  },
  genre: {
    type: String,
    trim: true,
    required: true
  },
  photo: {
    type: String,
    trim: true,
    required: true
  },
  reviewerId: {
    type: String, //Also keeping this as string instead of number
    trim: true,
    required: true
  },
  timestamps : {
    created: Date,
    updated: Date,
  }
},
{ timestamps: true }
)

FilmSchema.pre('save', function(next){
  next()
})
module.exports = mongoose.model('Film', FilmSchema)
