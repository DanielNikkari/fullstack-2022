import "./App.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { CountryData } from "./components/CountryData"
import { TooManyMatches } from "./components/TooManyMatches"
import { MoreThanOne } from "./components/MoreThanOne"

function App() {
  const [searchVal, setSearchVal] = useState("")
  const [data, setData] = useState([])
  const [displayData, setDisplayData] = useState("")

  const handleSearchChange = (event) => {
    setSearchVal(event.target.value)
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      // console.log(response.data)
      // console.log(response.data[1].name.common)
      // console.log(response.data[1].languages)
      setData(response.data)
    })
  }, [])

  var countriesToShow =
    searchVal === ""
      ? []
      : data.filter((country) => {
          if (
            country.name.common
              .toLowerCase()
              .includes(searchVal.toLowerCase()) ||
            country.name.official
              .toLowerCase()
              .includes(searchVal.toLowerCase())
          ) {
            return true
          } else {
            return false
          }
        })

  useEffect(() => {
    const chooseCountry = (country) => {
      setDisplayData(<CountryData countriesToShow={[country]} />)
    }

    if (countriesToShow.length === 1) {
      setDisplayData(<CountryData countriesToShow={countriesToShow} />)
    } else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
      setDisplayData(
        <MoreThanOne
          countriesToShow={countriesToShow}
          chooseCountry={chooseCountry}
        />
      )
    } else if (countriesToShow.length > 10 && searchVal !== "") {
      setDisplayData(<TooManyMatches countriesToShow={countriesToShow} />)
    }
  }, [searchVal])

  return (
    <div className="App">
      <h1 className="App-header">Find countries</h1>
      <div className="app-stat">
        <input value={searchVal} onChange={handleSearchChange} />
      </div>
      <div className="data-container">{displayData}</div>
    </div>
  )
}

export default App
