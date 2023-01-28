const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username: "TestUser1",
    name: "Jane Doe",
    password: "password1"
  },
  {
    username: "TestUser2",
    name: "Jon Doe",
    password: "password2"
  },
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, initialUsers, blogsInDB, usersInDB }