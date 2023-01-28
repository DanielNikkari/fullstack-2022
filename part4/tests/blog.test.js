const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogModels = helper.initialBlogs.map(blog => new Blog(blog))
  const blogSaves = blogModels.map(blogModel => blogModel.save())
  await Promise.all(blogSaves)
})

test('GET request to /api/blogs returns the right amount of blogs in JSON format', async () => {
  
  const resultBlogs = await api
    .get('/api/blogs/')
    .expect('Content-Type', /application\/json/)

  expect(resultBlogs.body).toHaveLength(helper.initialBlogs.length)
})

test('Blog has unique identifier property named id', async () => {

  const resultBlogs = await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlogs.body[0].id).toBeDefined()
})