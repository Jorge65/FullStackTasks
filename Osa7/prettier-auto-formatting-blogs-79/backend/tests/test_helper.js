const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'just me',
    url: 'https://testi.com/',
    likes: 1,
  })
  await blog.save()
  // the following remove method does not work
  //   with mongoose version 7...
  // remove is depreciated....
  await blog.remove()

  return blog._id.toString()
}

const initialUsers = [
  {
    username: 'root1',
    password: 'sekret1',
  },
  {
    username: 'root2',
    password: 'sekret1',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  initialUsers,
  blogsInDb,
  usersInDb,
}
