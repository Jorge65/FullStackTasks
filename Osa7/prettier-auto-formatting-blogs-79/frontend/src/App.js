import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import InfoNotification from './components/InfoNotification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((initialblogs) => {
      setBlogs(initialblogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        const fixedBlog = {
          ...returnedBlog,
          user: {
            username: user.username,
            name: user.name,
          },
        }
        setBlogs(blogs.concat(fixedBlog))
        setInfoMessage(`Added blog with title "${returnedBlog.title}"`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const increaseLikesOf = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = {
      user: blog._id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        const fixedBlog = {
          ...returnedBlog,
          user: {
            username: blog.user.username,
            name: blog.user.name,
            id: blog.user.id,
          },
        }
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : fixedBlog)))
      })
      .catch(() => {
        setErrorMessage('The like update was not successful')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (id) => {
    if (!window.confirm('Remove blog?')) {
      return
    }
    blogService
      .remove(id)
      .then(() => {
        setInfoMessage('The blog was removed"')
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      })
      .catch(() => {
        setErrorMessage('Error in removal')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter((b) => b.id !== id))
      })
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs app</h1>
        <InfoNotification message={infoMessage} />
        <ErrorNotification message={errorMessage} />
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <InfoNotification message={infoMessage} />
      <ErrorNotification message={errorMessage} />
      <p>
        <>{user.name} logged in</>
        <button
          id="logout-button"
          onClick={() => {
            setUser(null)
            window.localStorage.removeItem('loggedBlogappUser')
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ul>
        {blogs
          .sort((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              name={user.name}
              increaseLikes={() => increaseLikesOf(blog.id)}
              removeBlog={() => removeBlog(blog.id)}
            />
          ))}
      </ul>
    </div>
  )
}

export default App
