import { useState, useEffect } from "react"
import { Persons } from "./components/Persons"
import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import "./App.css"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
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

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

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
