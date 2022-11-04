import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterVal, setFilter] = useState('')
  
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