const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const Persons = (props) => {
    return (
        props.persons
            .filter((person) => person.name.toLowerCase().includes(props.filter.toLowerCase()) )
            .map((person) => 
            <Person key={person.id} name={person.name} number={person.number} />
        )
    )
}

export default Persons