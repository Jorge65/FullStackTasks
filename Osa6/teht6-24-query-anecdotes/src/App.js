import { useQuery } from 'react-query'
import { useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const notification = `anecdote '${updatedAnecdote.content}' voted`
      dispatch({ type: 'SET', payload: notification })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)      
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({ type: 'SET', payload: 'voting failed...' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)      
      queryClient.invalidateQueries('anecdotes')
    },
  })
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 4
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.error) { 
    return 'Anecdote service not available due to problems in server'
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
