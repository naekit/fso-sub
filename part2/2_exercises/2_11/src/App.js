import { useState, useEffect } from 'react'
import numberService from './services/numberService'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterVal, setFilter] = useState('')
  const [successMessage, setSuccess] = useState('')
  const [errorMessage, setError] = useState('')

  // effect hook to get server

  useEffect(() => {
    numberService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }, [])
  
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
        .catch((error) => {
          setError(`${altPerson.name} has already been removed`)
          console.log(error)
          setPersons(persons.filter(person => person.id !== existing.id))
          setTimeout(() => {
            setError(null)
          },3000)
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
      .then(() => {
        setSuccess(
          `Added ${newPerson.name}`
        )
        setTimeout(() => {
          setSuccess(null)
        }, 2000)
      })
  }

  const delPerson = (event) => {
    const id = event.target.value
    numberService
      .del(id)
      .then(() => {
        let people = persons.filter((person) => person.id !== +id)
        setPersons(people)
      })
      .catch(() => {
        console.log('error caught');
      })
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
      {
      successMessage ? 
        <Notification message={successMessage} cls='success' />:
          errorMessage ? <Notification message={errorMessage} cls='error' />:
            null
      }
      <h2>Numbers</h2>
      <Persons delPerson={delPerson} persons={persons} filter={filterVal}/>
    </div>
  )
}

export default App