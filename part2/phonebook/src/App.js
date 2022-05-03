import {useState, useEffect} from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  })

  const submitToPhoneBook = (event) => {
    event.preventDefault()
    let alreadyExists = persons.find(person => person.name === newName);
    if(alreadyExists){
      alert(`${newName} is already added to the phonebook`);
    } else {
      const person = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <h3>Search</h3>
      <Filter filter={filter} filterChangeEvent={handleFilterChange} />
      <h3>Add New Number</h3>
      <PersonForm submitToPhoneBook={submitToPhoneBook} newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App;
