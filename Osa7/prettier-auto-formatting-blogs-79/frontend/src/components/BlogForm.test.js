import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()

  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const input1 = container.querySelector('#title-input')
  const input2 = container.querySelector('#author-input')
  const input3 = container.querySelector('#url-input')
  const sendButton = screen.getByText('create')

  await user.type(input1, 'test-title')
  await user.type(input2, 'test-author')
  await user.type(input3, 'test-url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test-title')
  expect(createBlog.mock.calls[0][0].author).toBe('test-author')
  expect(createBlog.mock.calls[0][0].url).toBe('test-url')
})
