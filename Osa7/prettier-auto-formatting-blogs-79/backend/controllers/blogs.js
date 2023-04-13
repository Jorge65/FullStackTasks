const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
//const logger = require('../utils/logger')
//const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  if (body.title === undefined || body.url === undefined) {
    return response
      .status(400)
      .json({ error: 'undefined title or undifined URL' })
  }

  const userObject = request.user
  const user = await User.findById(userObject.id)
  if (body.title === undefined || body.url === undefined) {
    return response
      .status(400)
      .json({ error: 'undefined title or undifined URL' })
  }

  const likes = body.likes === undefined ? 0 : body.likes
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    return response.status(400).json({ error: 'non-existing ID' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  }

  Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog)
    })
    .catch((error) => next(error))
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const userObject = request.user
  const user = await User.findById(userObject.id)

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: 'non-existing ID' })
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'No rights to delete' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json({ deletion: 'successful' })
})

module.exports = blogsRouter
