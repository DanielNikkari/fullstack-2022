import { useState } from "react"
import { Person } from "./components/Person"
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
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

  return (
    <div className="App">
      <h2 className="App-header">Phonebook</h2>
      <div className="App-stat">debug: {newName}</div>
      <form onSubmit={addName}>
        <div className="App-stat">
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2 className="App-header2">Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} name={person.name} />
        ))}
      </ul>
    </div>
  )
}

export default App
