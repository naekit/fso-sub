import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterVal, setFilter] = useState('')

  // effect hook to get server

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
  // handle filter and convert target value to lower case
  
  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const submitPerson = (event) => {
    if(persons.filter(x => x.name === newName).length){
      alert(`${newName} is already added to the phone book`)
      return
    }
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter val={filterVal} change={handleFilter}/>
      <h2>add new</h2>
      <form onSubmit={submitPerson}>
        <div>
        <PersonForm label='name' val={newName} change={handleName}/>
        <PersonForm label='number' val={newNumber} change={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterVal}/>
    </div>
  )
}

export default App