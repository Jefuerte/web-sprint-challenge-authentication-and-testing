// Write your tests here
const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');

test('sanity', () => {
  expect(true).toBe(true)
});

beforeEach(async () => {
  await request(server).post('/api/auth/register')
    .send({
      username: "PeterParker",
      password: "imnotSpiderman"
    })
})

describe('[POST] /register', () => {
  test('causes a user to be added to the database', async () => {
    const users = await db('users')
    expect(users).toHaveLength(1)
  })
  test('responds with a newly created user', async () => {
    const users = await db('users')
    expect(users[0].username).toEqual("PeterParker")
  })
})

describe('[POST] /login', () => {
  let login
  beforeEach(async () => {
    login = await request(server).post('/api/auth/login')
      .send({
        username: "PeterParker",
        password: "imnotSpiderman"
      })
  })

  test('allows a user to login', async () => {
    expect(login.text).toMatch('token')
  })

  test('responds with a greeting to logged in user', async () => {
    expect(login.text).toMatch('welcome, PeterParker')
  })
}) 
