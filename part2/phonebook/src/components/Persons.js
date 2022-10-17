import { Person } from "./Person"

export const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            id={person.id}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  )
}
