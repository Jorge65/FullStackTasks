import { useState } from 'react'

const Title = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  if (props.text === 'average') {
      if (props.sum === 0) {
        return (
          <tr>
            <td> {props.text} </td>
            <td> {0} </td>
          </tr>
        )
      }  
      return (
        <tr> 
          <td>{props.text} </td>
          <td>{props.rate / props.sum}</td>
        </tr>
      )
    } 
    if (props.text === 'positive') {
      if (props.sum === 0) {
        return (
          <tr> 
            <td> {props.text} </td>
            <td> {0} % </td> 
          </tr>
        )
      }  
      return (
        <tr> 
          <td> {props.text} </td>
          <td> {props.rate/props.sum*100} % </td>
        </tr>
      )
    } 
  return (
    <tr> 
      <td> {props.text} </td>
      <td> {props.rate} </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) === 0)
    return (
      <div>
        <p> No Feedback given </p>
      </div>
    )
  return (
    <div>
      <table>   
        <tbody>   
          <StatisticsLine text={'good'} rate={good} />
          <StatisticsLine text={'neutral'} rate={neutral} />
          <StatisticsLine text={'bad'} rate={bad} />
          <StatisticsLine text={'all'} rate={bad+neutral+good} />
          <StatisticsLine text={'average'} rate={(bad*-1 + neutral*0 + good*1)} sum={(bad+neutral+good)} />
          <StatisticsLine text={'positive'} rate={good} sum={(bad+neutral+good)} percent={'%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const increaseGoodByOne = () => {
    console.log('increasing good, value before', good)
    setGood(good + 1)
  }
  const increaseNeutralByOne = () => {
    console.log('increasing neutral, value before', neutral)
    setNeutral(neutral + 1)
  }  
  const increaseBadByOne = () => {
    console.log('increasing good, value before', bad)
    setBad(bad + 1)
  }
  return (
    <div>
      <Title text={'give feedback'} />
      <Button handleClick={increaseGoodByOne} text="good" />
      <Button handleClick={increaseNeutralByOne} text="neutral" />
      <Button handleClick={increaseBadByOne} text="bad" />
      <Title text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
