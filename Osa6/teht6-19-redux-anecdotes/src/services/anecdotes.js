import axios from 'axios'
//import { useSelector } from 'react-redux'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateOne = async (updatedAnecdote) => {
  const object = {...updatedAnecdote}
//  console.log('.....updatedAnecdote', updatedAnecdote)
  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, object)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateOne }