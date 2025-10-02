import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByValue } from './counterSlice'
import { unshift, shift, clear } from './stackSlice'

function App() {
  const dispatch = useDispatch()

  
  const count = useSelector((state) => state.counter.count)
  const [inputValue, setInputValue] = useState(0)

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

  const handleIncrementByValue = () => {
    dispatch(incrementByValue(inputValue))
     
  }


  const stack = useSelector((state) => state.stack.items)
  const [stackValue, setStackValue] = useState("")

  const handleInsert = () => {
    if (stackValue.trim() !== "") {
      dispatch(unshift(stackValue))
      setStackValue("")
    }
  }

  const handleDelete = () => {
    dispatch(shift())
  }

  const handleClear = () => {
    dispatch(clear())
  }

  return (
    <>
      
      <h2>Counter</h2>
      <p> Counter is: {count} </p>

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
        />
        <button onClick={handleIncrementByValue}>
          Incrementar por valor
        </button>
      </div>

      <hr />

     
      <h2>Stack</h2>
      <input
        type="text"
        value={stackValue}
        onChange={(e) => setStackValue(e.target.value)}
      />
      <button onClick={handleInsert}>Insert</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleClear}>Clear</button>

      <h3>Pila actual:</h3>
      {stack.length === 0 ? (
        <p>(vacía)</p>
      ) : (
        <ul>
          {stack.map((item, index) => (
            <li key={index}>
              {item} {index === stack.length - 1 }
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App