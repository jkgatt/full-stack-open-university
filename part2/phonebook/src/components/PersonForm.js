const PersonForm = ({ submitToPhoneBook, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={submitToPhoneBook}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
        person: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm