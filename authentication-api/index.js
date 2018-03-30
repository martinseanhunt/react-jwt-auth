const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

// DB Setup
mongoose.connect('mongodb://127.0.0.1/react-auth')

// App Setup
const app = express()
const router = require('./routes/routes')
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('beep boop Im a server running on:', port)