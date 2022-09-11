const mongoose = require('mongoose')
//Define a schema
const Schema = mongoose.Schema
const CommentSchema = new Schema({
  filmId: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true
  },
  comment: {
    type: String,
    trim: true,
    required: true
  }
},
{ timestamps: true }
)
// hash user password before saving into database
CommentSchema.pre('save', function(next){
  //this.timestamps.created = Date.now()
  next()
})
module.exports = mongoose.model('Comment', CommentSchema)
