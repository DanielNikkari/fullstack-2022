const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
  const { username, password, name } = request.body

  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({ error: 'minimum length for password and username is 3 characters' })
  }

  const saltrounds = 10
  const passwordHash = await bcrypt.hash(password, saltrounds)

  const user = new User({
    username,
    name,
    password,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
    response.status(400).send({ error: 'username should be unique'})
  }
  
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

module.exports = userRouter