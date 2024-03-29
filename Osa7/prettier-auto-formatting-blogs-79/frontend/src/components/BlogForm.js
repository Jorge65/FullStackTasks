import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            id="title-input"
          />
        </div>
        <div>
          Author
          <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            id="author-input"
          />
        </div>
        <div>
          Url
          <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            id="url-input"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
