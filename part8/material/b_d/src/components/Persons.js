import { useState } from "react"
import { useQuery } from '@apollo/client'
import PersonForm from "./PersonForm"
import { FIND_PERSON } from "../queries"
import EditForm from "./EditForm"

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person?.name}</h2>
      <div>
        {person?.address.street} {person?.address.city}
      </div>
      <div>{person?.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

const Persons = ({ persons, setError }) => {
    const [nameToSearch, setNameToSearch] = useState(null)
    const result = useQuery(FIND_PERSON, {
      variables: { nameToSearch },
      skip: !nameToSearch,
    })
  
    if(nameToSearch && result.data) {
      return (
        <Person
          person={result.data.findPerson}
          onClose={() => setNameToSearch(null)}
        />
      )
    }
    console.log(nameToSearch, result)
    return (
      <div>
        <h2>Persons</h2>
        {persons.map((p) => ( 
          <div key={p.name}>
            {p.name} {p.phone ? p.phone: <i>no number</i>}
            <button onClick={() => setNameToSearch(p.name)}>
              show address
            </button>
          </div>  
        ))}
        <PersonForm setError={setError} />
        <EditForm setError={setError}/>
      </div>
    )
}

export default Persons