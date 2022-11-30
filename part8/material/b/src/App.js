import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { All_PERSONS } from './queries'
import Persons from './components/Persons'
import Notify from './components/Notify'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(All_PERSONS)
  
  if(result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} setError={notify} />
    </div>
  )
}

export default App;
