const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
//Define a schema
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  isReviewer: {
    type: String,
    trim: true,
    required: true,
    default: false
  },
  timestamps : {
    created: Date,
    updated: Date,
  }
},
{ timestamps: true }
)
// hash user password before saving into database
UserSchema.pre('save', function(next){
  //this.timestamps.created = Date.now()
  this.password = bcrypt.hashSync(this.password, saltRounds)
  next()
})
module.exports = mongoose.model('User', UserSchema)
