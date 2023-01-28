const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

const config = require('./utils/config')
require('express-async-errors')

const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndPoint)

module.exports = app