export const MoreThanOne = ({ countriesToShow }) => {
  return (
    <div>
      {countriesToShow.map((country, i) => {
        return (
          <li key={i} className="moreThanOne">
            <span className="common-name">
              <b>{country.name.common}</b>
            </span>
            <br />
            Official name: {country.name.official}
          </li>
        )
      })}
    </div>
  )
}
