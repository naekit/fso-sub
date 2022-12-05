import { useApolloClient, useQuery } from '@apollo/client'
import { useState } from 'react'
import { All_PERSONS } from './queries'
import Persons from './components/Persons'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(All_PERSONS)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  if(result.loading) {
    return <div>loading...</div>
  }

  if(!token){
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }



  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} setError={notify} />
    </div>
  )
}

export default App;
