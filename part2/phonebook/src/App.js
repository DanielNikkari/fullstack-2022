import { useState } from "react"
import { Persons } from "./components/Persons"
import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchValue, setSearchValue] = useState("")

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
    setNewNumber("")
  }

  const personsToShow =
    searchValue === ""
      ? persons
      : persons.filter((person) => {
          const index = person.name
            .toLowerCase()
            .indexOf(searchValue.toLocaleLowerCase())
          if (index === -1) {
            return false
          } else {
            return true
          }
        })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="App">
      <h2 className="App-header">Phonebook</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <Filter
        searchValue={searchValue}
        handleFilterChange={handleFilterChange}
      />

      <h2 className="App-header2">Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
