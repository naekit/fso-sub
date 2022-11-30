import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import { All_PERSONS } from './queries'

const App = () => {
  const result = useQuery(All_PERSONS)
  
  if(result.loading) {
    return <div>loading...</div>
  }

  return (
    <Persons persons={result.data.allPersons} />
  )
}

export default App;
