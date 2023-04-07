import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div>
            <div>{anecdote.content}</div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter, notification}) => {
        if ( filter === '' ) {
            return anecdotes
        } else {
            return anecdotes.filter(a => a.content.includes(filter))
        }
    })
    return(
        <div>
            {anecdotes.slice().sort((a, b) => (a.votes > b.votes) ? -1 : 1).map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => 
                    {
                    dispatch(voteAnecdote(anecdote))
                    dispatch(setNotification(`You voted "${anecdote.content}"`, 10))
                    }
                }
                />
            )}
        </div>
    )
}

export default AnecdoteList
