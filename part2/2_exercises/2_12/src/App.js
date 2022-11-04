import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {

  const [filterVal, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [display, setDisplay] = useState([])
  const [weather, setWeather] = useState('')

  // effect hook to get server

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setDisplay(response.data)
      })
  }, [])
  
  useEffect(() => {
    const disp = display[0] !== undefined ? display[0].capital: 'bern'
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${disp}&appid=e1d0b269b743ca11434225ed871bd4c5&units=metric`)
      .then(response => setWeather(response.data))
  }, [display])
  
  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
    setDisplay(countries.filter(x => x.name.common.toLowerCase().includes(filterVal)))
  }
  
  const handleShow = event => {
    const parsedX = JSON.parse(event.target.value)
    setDisplay([parsedX])
  }
  
  return (
    <div>
      <h2>countries</h2>
      <Filter val={filterVal} change={handleFilter}/>
      {display.length > 10 ? 
        <p>
          Too many matches, specify another filter
        </p> :
          display.length > 1 ? display.map(x => 
          <p key={x.name.common}>
            <span>{x.name.common}</span>
            <button value={JSON.stringify(x)} onClick={handleShow}>show</button>
          </p>) :
            display.map(x =>
              <div key={x.name.common}>
                <h2>{x.name.common}</h2>
                <p><b>Capital:</b> {x.capital}</p>
                <p><b>Area:</b> {x.area}</p>
                <b>Languages:</b>
                <ul>
                    {Object.values(x.languages).map(x => <li key={x}>{x}</li>)}
                </ul>
                <img src={x.flags.png} alt='flag of searched country'/>
                <div>
                  <h2>Weather in {x.capital}</h2>
                  <p><b>Temperature:</b> {weather.main.temp} C</p>
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
                  <p><b>Wind:</b>{weather.wind.speed}</p>
                </div>
              </div>
              )
      }
    </div>
  )
}

export default App