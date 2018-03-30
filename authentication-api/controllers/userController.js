const User = require('../models/userModel')
const jwt = require('jwt-simple')
const config = require('../config')

const createToken = user => {
  const timeStamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret)
}

exports.createUser = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(422).send({ error: 'must provide email and password' })
  
  User.findOne({ email }, (err, existingUser) => {
    if(err) return next(err)
    if(existingUser) return res.status(422).send({ error: 'Email is in use' })
  
    const user = new User({ email, password })

    user.save((err, createdUser) => {
      if(err) return next(err)
      res.send({ token: createToken(createdUser) })
    })
  })
}

exports.login = (req, res, next) => {
  // User has already authed, just need to issues token
  // passport is adding .user on to the request when using local strategy
  res.send({ token: createToken(req.user) })
}