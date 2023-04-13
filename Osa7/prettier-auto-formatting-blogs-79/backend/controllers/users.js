const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (username.length < 4) {
    return response
      .status(400)
      .json({ error: 'too short username (min 3 characters)' })
  }
  if (password.length < 4) {
    return response
      .status(400)
      .json({ error: 'too short password (min 3 characters)' })
  }

  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    URL: 1,
    likes: 1,
  })
  response.json(users)
})

module.exports = usersRouter
