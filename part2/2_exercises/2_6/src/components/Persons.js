const Persons = ({persons, filter}) => {
    // decide whether filtered name is in persons object in lower case
    const personsToShow = !filter ? persons: 
                          persons.filter(x => x.name.toLowerCase().includes(filter))
    return (
        <div>
        {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons