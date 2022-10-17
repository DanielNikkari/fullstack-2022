import { useState, useEffect } from "react"
import { Persons } from "./components/Persons"
import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import personService from "./services/persons"
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

    const person = persons.find((person) => personObject.name === person.name)
    if (person !== undefined) {
      // alert(`${personObject.name} is already added to phonebook`)
      if (
        window.confirm(
          `${personObject.name} is already in the phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number: newNumber }
        const id = person.id
        console.log(`id ${id}`)
        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            console.log(returnedPerson)
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            )
          })
          .catch((error) => {
            alert(`unable to update the phone number for ${person.name}`)
            setPersons(persons.filter((person) => person.id !== id))
          })
      }
      setNewName("")
      setNewNumber("")
      return
    }
    setPersons(persons.concat(personObject))
    personService.add(personObject).then((response) => {
      console.log(response)
      personService.getAll().then((response) => {
        setPersons(response.data)
      })
    })

    setNewName("")
    setNewNumber("")
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log(`Deleting person ${name} with id ${id}`)
      personService.deletePerson(id).then((response) => {
        if (response.status === 200) {
          personService.getAll().then((response) => {
            setPersons(response.data)
          })
        }
      })
    }
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
    personService.getAll().then((response) => {
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
