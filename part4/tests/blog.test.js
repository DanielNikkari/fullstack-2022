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

test('POST request to /api/blogs creates a new blog with correct content', async () => {
  
  const newBlog = {
    title: "Test3",
    author: "test3author",
    url: "http://test3.com",
    likes: 30
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogs = await helper.blogsInDB()

  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

  const blogAuthors = blogs.map(blog => blog.author)

  expect(blogAuthors).toContain('test3author')
})

test('If blog is posted without like propery the likes default to 0', async () => {

  const newBlog = {
    title: "Test4",
    author: "test4author",
    url: "http://test4.com",
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDB()
  
  expect(blogs[2].likes).toBe(0)
})

test('If title or url is missing from the blog server responds with status code 400', async () => {

  const newBlogTitle = {
    author: "test4author",
    url: "http://test4.com",
    likes: 10
  }

  const newBlogUrl = {
    title: "Test4",
    author: "test4author",
    likes: 10
  }

  await api
    .post('/api/blogs/')
    .send(newBlogTitle)
    .expect(400)
  
  await api
    .post('/api/blogs/')
    .send(newBlogUrl)
    .expect(400)
  })