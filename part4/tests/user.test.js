const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userModels = helper.initialUsers.map(user => new User(user))
  const userSaves = userModels.map(userModel => userModel.save())
  await Promise.all(userSaves)
})

describe('GET request tests', () => {

  test('GET request to /api/users returns users in JSON format', async () => {

    const result = await api
      .get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toHaveLength(helper.initialUsers.length)

  })

})

describe('POST request tests', () => {

  test('POST request to /api/users creates new user to the database', async () => {
    newUser = {
      username: "TestUser3",
      name: "Test User",
      password: "password3",
    }

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDB()

    expect(users).toHaveLength(helper.initialUsers.length + 1)
    expect(users[2].username).toEqual('TestUser3')

  })

  test('POST request to /api/users with too short username returns status 400 and the user is not added to the database', async () => {

    newUser = {
      username: "Te",
      name: "Test User",
      password: "password3",
    }

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toBe('minimum length for password and username is 3 characters')
      })

    const users = await helper.usersInDB()

    expect(users).toHaveLength(helper.initialUsers.length)

  })

  test('POST request to /api/users with too short password returns status 400 and the user is not added to the database', async () => {

    newUser = {
      username: "TestUser3",
      name: "Test User",
      password: "pa",
    }

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toBe('minimum length for password and username is 3 characters')
      })

    const users = await helper.usersInDB()

    expect(users).toHaveLength(helper.initialUsers.length)

  })

  test('POST request to /api/users without unique username causes an error', async () => {

    newUser = {
      username: "TestUser1",
      name: "Test User",
      password: "password3",
    }

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect(response => {
        expect(response.body.error).toBe('username should be unique')
      })

    const users = await helper.usersInDB()

    expect(users).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})