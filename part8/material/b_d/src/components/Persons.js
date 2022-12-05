import { useState } from "react"
import { useQuery } from '@apollo/client'
import Person from "./Person"
import PersonForm from "./PersonForm"
import { FIND_PERSON } from "../queries"
import EditForm from "./EditForm"

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