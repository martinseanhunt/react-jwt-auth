const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Define model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'email is reqquired'
  },
  password: String
})

// On Save Hook, encrypt pass
userSchema.pre('save', function(next) {
  const user = this

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(submittedPassword, callback) {
  bcrypt.compare(submittedPassword, this.password, function(err, isMatch) {
    if(err) return callback(err)
    callback(null, isMatch)
  })
}

// Create and export model class
module.exports = mongoose.model('User', userSchema)