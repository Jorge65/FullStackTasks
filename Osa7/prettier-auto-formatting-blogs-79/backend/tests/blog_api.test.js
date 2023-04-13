const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

var testToken
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  const passwordHash = await bcrypt.hash('secret10', 10)
  const user = new User({
    username: 'mainTester',
    passwordHash,
  })
  await user.save()

  const response = await api.post('/api/login/').send({
    username: 'mainTester',
    password: 'secret10',
  })
  testToken = response.body.token
})

describe('REST API / GET tests', () => {
  test('GET API/JSON: blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Get API: all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Get API: check that ID value is defined ', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.map((r) => r.id)
    expect(id[0]).toBeDefined()
  })

  test('Get API: a specific blog is within returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const url = response.body.map((r) => r.url)
    expect(url).toContain('https://reactpatterns.com/')
  })

  test('GET API/ID: a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    //const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('GET API/ID: fails with statuscode 400 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/blogs/${validNonexistingId}`).expect(400)
  })

  test('GET API/ID: fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('REST API / POST tests', () => {
  test('POST API: a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${testToken}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map((b) => b.title)
    expect(title).toContain('Go To Statement Considered Harmful')
  })

  test('POST API: blog without proper token', async () => {
    const newBlog = {}

    await api
      .post('/api/blogs')
      .set({ Authorization: 'broken token' })
      .send(newBlog)
      .expect(401)
  })

  test('POST API: blog without content is not added', async () => {
    const newBlog = {}

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${testToken}` })
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('POST API: blog without URL is not added', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      // url: testing without URL
      likes: 5,
    }
    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${testToken}` })
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('POST API: blog without title is not added', async () => {
    const newBlog = {
      //title: testing without title
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }
    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${testToken}` })
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('POST API: blog without likes - added with zero likes', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      // likes: testing... no value set ....
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${testToken}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const likes = blogsAtEnd.map((b) => b.likes)
    expect(likes).toContain(0)
  })
})

describe('REST API / PUT tests', () => {
  test('PUT/ID API: blog change - adding likes by 100', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToCompare = blogsAtStart[0]
    const updatedBlog = {
      title: blogToCompare.title,
      author: blogToCompare.author,
      url: blogToCompare.url,
      likes: blogToCompare.likes + 100,
    }

    await api
      .put(`/api/blogs/${blogToCompare.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogChanged = blogsAtEnd[0]

    expect(blogChanged.likes).toBe(blogToCompare.likes + 100)
  })
})

describe('REST USER API: when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('USER API 1: creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jore',
      name: 'Jorma Kemppainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('USER API 2: creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('USER API 3: fails with username shorter than 4', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'roo',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('too short username')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('USER API 3: fails with username shorter than 4', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sal',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('too short password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('REST API / DELETE tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const savedUser = await User.find({ username: 'mainTester' })
    //console.log(savedUser)

    const newBlog = new Blog({
      title: 'A long story',
      author: 'Story Teller',
      url: 'another url',
      likes: 43,
      user: savedUser[0]._id,
    })

    await newBlog.save()
    //console.log(newBlog)
  })

  test('DELETE API: a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${testToken}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(0)

    const title = blogsAtEnd.map((r) => r.content)
    expect(title).not.toContain(blogToDelete.title)
  })

  test('DELETE API: deletion fails if invalid token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: 'Bearer NoToken' })
      .expect(401)
  })

  test('DELETE API: deletion fails if invalid blog ID', async () => {
    await api
      .delete('/api/blogs/123412341234')
      .set({ Authorization: `Bearer ${testToken}` })
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
