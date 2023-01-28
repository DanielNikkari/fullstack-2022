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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.status(204).json(result)
})

module.exports = blogsRouter