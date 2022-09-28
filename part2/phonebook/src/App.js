import { useState } from "react"
import { Person } from "./components/Person"
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (
      persons.filter((person) => personObject.name === person.name).length !== 0
    ) {
      alert(`${personObject.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div className="App">
      <h2 className="App-header">Phonebook</h2>
      <form onSubmit={addPerson}>
        <div className="App-stat">
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div className="App-stat">
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2 className="App-header2">Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  )
}

export default App
