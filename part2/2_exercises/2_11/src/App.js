import { useState, useEffect } from 'react'
import numberService from './services/numberService'
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
    numberService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }, [persons])
  
  // handle filter and convert target value to lower case
  
  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const submitPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(persons.filter(x => x.name === newName).length){
      const existing = persons.find(item => item.name === newName)
      const altPerson = {...existing, number: newNumber}
      console.log(existing.id)
      numberService
        .update(existing.id, altPerson)
        .then(alteredPerson => {
          setPersons(persons.map(person => person.id !== existing.id ? person: alteredPerson))
        })
      return
    }
    numberService
      .create(newPerson)
      .then(personObj => {
        setPersons(persons.concat(personObj))
        setNewName('')
        setNumber('')
      })
  }

  const delPerson = (event) => {
    const id = event.target.value
    numberService
      .del(id)
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
      <Persons delPerson={delPerson} persons={persons} filter={filterVal}/>
    </div>
  )
}

export default App