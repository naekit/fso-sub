import { useState } from 'react'

const Head = () => {
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  )
}

const Button = ({text, clickProp}) => {
  return (
    <button onClick={clickProp}>{text}</button>
  )
}

const Statistics = ({text, rating}) => {
  return (
    <tr><td>{text}:</td><td>{rating}</td></tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral || 1
  const average = (good - bad)/all
  const positive = ((good)/all)*100

  const handleClick = (rating) => {
    rating === 'good' ? setGood(good + 1):
      rating === 'bad' ? setBad(bad + 1):
        setNeutral(neutral + 1)
  }

  return (
    <div>
      <Head />
      <Button clickProp={() => handleClick('good')} text='good'/>
      <Button clickProp={() => handleClick('neutral')} text='neutral'/>
      <Button clickProp={() => handleClick('bad')} text='bad'/>
      {good || neutral || bad ?
        <table>
          <tbody>
          <Statistics rating={good} text='good'/>
          <Statistics rating={neutral} text='neutral'/>
          <Statistics rating={bad} text='bad'/>
          <Statistics rating={average.toFixed(3)} text='average'/>
          <Statistics rating={(positive.toFixed(1) + ' %')} text='positive'/>
          </tbody>
        </table>:
          <p>No feedback given</p>
      }
    </div>
  )
}

export default App