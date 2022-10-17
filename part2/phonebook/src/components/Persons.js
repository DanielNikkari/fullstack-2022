import { Person } from "./Person"

export const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person, index) => (
          <Person
            key={index}
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
