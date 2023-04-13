import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders title/author in detailed blog view', () => {
  const blog = {
    title: 'test1-title',
    author: 'test1-author',
    url: 'testi1-url',
    user: { name: 'Jorma Kemppainen' },
  }
  const nimi = 'Jorma Kemppainen'

  render(<Blog blog={blog} name={nimi} />)

  const element = screen.getByText('test1-title by test1-author')
  expect(element).toBeDefined()
})

test('renders title/author in single-line blog view', () => {
  const blog = {
    title: 'test1-title',
    author: 'test1-author',
    url: 'testi1-url',
    user: { name: 'Jorma Kemppainen' },
  }
  const nimi = 'Jorma Kemppainen'

  render(<Blog blog={blog} name={nimi} />)

  const element = screen.getByText('test1-title by test1-author')
  expect(element).toBeDefined()
})

test('renders title2', () => {
  const blog = {
    title: 'test1-title',
    author: 'test1-author',
    url: 'testi1-url',
    user: { name: 'Jorma Kemppainen' },
  }
  const nimi = 'Jorma Kemppainen'

  render(<Blog blog={blog} name={nimi} />)

  const element = screen.getByText('test1-title by test1-author')
  expect(element).toBeDefined()
})

test('detailed data ok after clicking detailed view button', async () => {
  const blog = {
    title: 'test1-title',
    author: 'test1-author',
    url: 'testi1-url',
    user: { name: 'Jorma Kemppainen' },
  }
  const nimi = 'Jorma Kemppainen'

  render(<Blog blog={blog} name={nimi} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('testi1-url')
  expect(element).toBeDefined()

  const element2 = screen.getByText('test1-title by test1-author')
  expect(element2).toBeDefined()
})

test('clicking the like button calls event handler twice', async () => {
  const blog = {
    title: 'test1-title',
    author: 'test1-author',
    url: 'testi1-url',
    user: { name: 'Jorma Kemppainen' },
  }
  const nimi = 'Jorma Kemppainen'

  const mockHandler = jest.fn()
  render(<Blog blog={blog} name={nimi} increaseLikes={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const user1 = userEvent.setup()
  const button2 = screen.getByText('like')
  await user1.click(button2)
  await user1.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
