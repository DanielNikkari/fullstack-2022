export const CountryData = ({ countriesToShow }) => {
  return (
    <div>
      {countriesToShow.map((country, j) => {
        return (
          <div key={j}>
            <h2 className="App-header2">{country.name.common}</h2>
            <h4 className="App-header-official">
              Official name: {country.name.official}
            </h4>
            <p>
              capital: {country.capital}
              <br />
              area: {country.area}
            </p>
            <h3>Languages:</h3>
            <ul>
              {Object.keys(country.languages).map((key, i) => {
                return <li key={i}>{country.languages[key]}</li>
              })}
            </ul>
            <img src={country.flags.png} alt="Country flag" />
          </div>
        )
      })}
    </div>
  )
}
