export const MoreThanOne = ({ countriesToShow, chooseCountry }) => {
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
            <button onClick={() => chooseCountry(country)}>show</button>
          </li>
        )
      })}
    </div>
  )
}
