import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'

import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const notification = `anecdote '${newAnecdote.content}' created`
      dispatch({ type: 'SET', payload: notification })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)      
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      const notification = error.response.data.error
      dispatch({ type: 'SET', payload: notification })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)      
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
