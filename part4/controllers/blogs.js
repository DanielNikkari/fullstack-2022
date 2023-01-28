const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  logger.info(request.body)

  if (!request.body.title || !request.body.url) {
    response.status(400).json({ error: "Bad Request" })
  } else {

    if (request.body.likes === undefined) {
      request.body.likes = 0
    }

    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
  }
})

module.exports = blogsRouter