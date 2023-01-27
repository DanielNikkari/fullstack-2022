const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Test1",
    author: "test1author",
    url: "http://test1.com",
    likes: 10,
  },
  {
    title: "Test2",
    author: "test2author",
    url: "http://test2.com",
    likes: 20,
  }
]

module.exports = { initialBlogs }