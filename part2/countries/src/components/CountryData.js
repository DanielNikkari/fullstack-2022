import { useEffect, useState } from "react"
import axios from "axios"

export const CountryData = ({ countriesToShow }) => {
  const [weather, setWeather] = useState({})
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const APIkey = process.env.REACT_APP_API_KEY
    const lat = countriesToShow[0].capitalInfo.latlng[0]
    const lon = countriesToShow[0].capitalInfo.latlng[1]

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
      )
      .then((response) => {
        setLoading(false)
        setWeather(response.data)
      })
  }, [])

  const dataToShow = weather.weather !== undefined ? weather : {}

  if (isLoading) {
    return (
      <div>
        <h2 className="App-header2">Loading...</h2>
      </div>
    )
  } else {
    const imgUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
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
                <img
                  className="country-flag"
                  src={country.flags.png}
                  alt="Country flag"
                />
                <h3>Weather in {country.capital[0]}</h3>
              </ul>
            </div>
          )
        })}
        <p>Temperature {Math.round(dataToShow.main.temp - 273.15)} Celsius</p>
        <img src={imgUrl} alt="weather icon" />
        <p>Wind {dataToShow.wind.speed} m/s</p>
      </div>
    )
  }
}
