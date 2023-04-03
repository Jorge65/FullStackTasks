import { useState } from 'react'

const Blog = ({ blog, name, increaseLikes, removeBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)
  //  const [viewDetails, setViewDetails] = useState(true)
  const toggleView = () => {
    setViewDetails(!viewDetails)
  }

  let viewLabel = viewDetails
    ? 'hide'
    : 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showIfAuthority = { display: (blog.user.name === name )  ? '' : 'none' }

  if ( viewDetails === true) {
    return (
      <div style={blogStyle}>
        <div className='title2'>
          {blog.title} by {blog.author}
          <button id='hide-button' onClick={toggleView}>{viewLabel}</button>
        </div>

        <a className='url2' href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button id='like-button' onClick={increaseLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showIfAuthority}>
          <button id='remove-button' className="removeButton" onClick={removeBlog}>remove</button>
        </div>
      </div>
    )}
  return (
    <div style={blogStyle}>
      <div className='title1'>
        {blog.title} by {blog.author}
        <button id='view-button' onClick={toggleView}>{viewLabel}</button>
      </div>
    </div>
  )
}

export default Blog
