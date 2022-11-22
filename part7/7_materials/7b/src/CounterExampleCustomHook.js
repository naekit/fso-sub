import './App.css';
import { useState } from 'react'

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero
  }
}

const App = (props) => {
  const counter1 = useCounter()
  const counter2 = useCounter()

  return (
    <div>
      <div>{counter1.value} left</div>
      <div>{counter2.value} right</div>
      <button onClick={counter1.increase}>
        left
      </button>
      <button onClick={counter2.increase}>
        right
      </button>      
      <button onClick={counter1.zero}>
        zero left
      </button>
      <button onClick={counter2.zero}>
        zero right
      </button>
    </div>
  )
}

export default App;
