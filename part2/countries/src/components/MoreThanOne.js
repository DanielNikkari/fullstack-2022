export const MoreThanOne = ({ countriesToShow }) => {
  return (
    <div>
      {countriesToShow.map((country, i) => {
        return (
          <li key={i} className="moreThanOne">
            {country.name.common}
          </li>
        )
      })}
    </div>
  )
}
