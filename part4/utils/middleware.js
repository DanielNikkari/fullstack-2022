const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const requestLogger = (request, respone, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('------------')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  
  next()
}

const userExtractor = async (request, response, next) => {
  const decodeToken = jwt.verify(request.token, config.SECRET)

  request.user = {
    username: decodeToken.username,
    id: decodeToken.id
  }

  next()
}

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = { requestLogger, tokenExtractor, userExtractor, unknownEndPoint, errorHandler }