const userController = require('../controllers/userController')
const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = function(app) {
  app.get('/', (req, res, next) => 
    res.send('<img src="https://media1.tenor.com/images/1fcea016af432389e7b444ae3b95abf2/tenor.gif">'))
  app.post('/signup', userController.createUser)
  app.post('/signin', requireLogin, userController.login)
  app.get('/prot', requireAuth, (req, res, next) => 
    res.send({ message: 'Hey this is secret so you must be logged in' }))
}