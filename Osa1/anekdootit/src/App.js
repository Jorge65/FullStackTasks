import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Anecdote = ({text, votes}) => {
  if ( votes === -1) {
    return (
      <div>
        <p> {text} </p>
      </div>
    )
  }
  return (
    <div>
      <p> {text} </p>
      <p> has {votes} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [mostCommon, setMostCommon] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])

  console.log('App.... parametrien jälkeen.... ', votes)

  const handleNextClick = () => {
    const rand = parseInt(Math.random() * anecdotes.length)
    console.log('rand:', selected)
    setSelected(rand)
  }

  const handleVoteClick = () => {
    const tempVotes = [...votes] 
    const tempLen = tempVotes.length
    let tempMostCommon = mostCommon 
    let maxVotes = 0 

    console.log('tempLen', tempLen)
    console.log('tempVotes:', tempVotes)    
    tempVotes[selected] = tempVotes[selected] + 1     
    maxVotes = 0 
    for (let i=0; i < tempLen; i++) {
      if (tempVotes[i] > maxVotes) {
        maxVotes = tempVotes[i]
        tempMostCommon = i 
      }
    }
    setVotes(tempVotes)
    setMostCommon(tempMostCommon)
  }

  console.log('...--------------rendering alkaa-------------....')
  console.log('selected:', selected)    
  console.log('mostCommon:', mostCommon)    
  console.log('votes:', votes)
  console.log('a1:', anecdotes[selected])
  console.log('a2:', anecdotes[mostCommon])
  console.log('mostCommonAmont:', votes[mostCommon])

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote votes={-1} text={anecdotes[selected]}  />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextClick} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Anecdote votes={votes[mostCommon]} text={anecdotes[mostCommon]}  />
    </div>
  )
}

export default App