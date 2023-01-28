const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {

  const { username, password } = request.body

  const user = await User.findOne({ username })
  
  const passwordRight = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordRight)) {
    return response.status(401).json({ error: "invalid username or password" })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60*60 })

  response.status(200).send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter