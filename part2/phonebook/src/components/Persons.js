import { Person } from "./Person"

export const Persons = ({ personsToShow }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.name} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  )
}
