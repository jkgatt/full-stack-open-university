const Person = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.number}
      </p>
      <button onClick={props.deleteContact}>Delete Contact</button>
    </div>
  );
};

const Persons = (props) => {
  return props.persons
    .filter((person) =>
      person.name.toLowerCase().includes(props.filter.toLowerCase())
    )
    .map((person) => (
      <Person key={person.id} name={person.name} number={person.number} deleteContact={() => props.deleteFromPhoneBook(person)}/>
    ));
};

export default Persons;
