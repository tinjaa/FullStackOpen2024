import { useState } from "react"

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <div>{text} {value}</div>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <td><StatisticLine text="good" value={props.good} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="neutral" value={props.neutral} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="bad" value={props.bad} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="all" value={props.all} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="average" value={(props.good - props.bad) / props.all} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="positive" value={props.good * 100 / props.all + " %"} /></td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App