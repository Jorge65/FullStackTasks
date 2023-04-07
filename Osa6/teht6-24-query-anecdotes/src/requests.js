import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => 
  axios.post(baseUrl, newAnecdote)
    .then(res => {
      console.log('...res.data', res.data.content)
      const notification = `anecdote '${res.data.content}' created`
      console.log('notification: ', notification)
      return res.data
    })

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(res => {
  return res.data
})
