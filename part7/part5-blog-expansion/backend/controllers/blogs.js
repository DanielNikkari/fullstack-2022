const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })
  response.status(200).json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const userJWT = request.user

  if (!request.body.title || !request.body.url) {
    response.status(400).json({ error: 'Bad Request' })
  } else {
    if (request.body.likes === undefined) {
      request.body.likes = 0
    }

    const user = await User.findById(userJWT.id)

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user._id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  if (!request.body.comment || request.body.comment.length === 0) {
    response.status(400).json({ error: 'Bad Request: comment missing' })
    return
  }

  const comment = request.body.comment
  const id = request.params.id

  let blog = await Blog.findById(id)
  blog = { ...blog, comments: blog.comments.push(comment) }
  const result = await Blog.findByIdAndUpdate(id, blog, {
    new: true
  })

  response.status(204).json(result)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).send({ error: 'wrong id' })
    }
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })

  response.status(204).json(result)
})

module.exports = blogsRouter
