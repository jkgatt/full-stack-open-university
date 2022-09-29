import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import phonebookServices from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    phonebookServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addTempMessage = (message, error) => {
    error? setError(true) : setError(false);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000)
  }

  const submitToPhoneBook = (event) => {
    event.preventDefault();
    let foundPerson = persons.find((person) => person.name === newName);
    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with the new one?`
        )
      ) {
        phonebookServices
          .update(foundPerson.id, { ...foundPerson, number: newNumber })
          .then((updateContact) => {
            setPersons(
              persons
                .filter((person) => foundPerson.id !== person.id)
                .concat(updateContact)
            );
          });
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      phonebookServices.create(person).then((newContact) => {
        setPersons(persons.concat(newContact));
        addTempMessage(`Added New Contact: ${newContact.name}`);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteFromPhonebook = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      phonebookServices
        .remove(contact.id)
        .then((response) => {
          if (response.status === 200) {
            setPersons(persons.filter((person) => contact.id !== person.id));
          }
        })
        .catch((error) => {
          addTempMessage(`Failed to delete the following contact ${contact.name} due to ${error}. Please try again later`, true);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={message} error={error}/>
      <h3>Search</h3>
      <Filter filter={filter} filterChangeEvent={handleFilterChange} />
      <h3>Add New Number</h3>
      <PersonForm
        submitToPhoneBook={submitToPhoneBook}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        persons={persons}
        deleteFromPhoneBook={deleteFromPhonebook}
      />
    </div>
  );
};

export default App;
