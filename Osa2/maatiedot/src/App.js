import { useState, useEffect } from 'react'
import axios from 'axios'

/* 
  Ohjelma kerää säätiedot OpenWeather palvelusta, joka vaatii käyttöön API-avaimen.
    https://home.openweathermap.org/
  Voit hankkia palveluun ilmaisen API-avaimen rekisteröitymällä.
  En valitettavasti voi jättää versionhallintaan omaa avaintani...

  Voit käynnistää ohjelman omalla API-avaimella seuraavasti:
    REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxx npm start  
  Ohjelman käynnistyessä arvo luetaan api_key muuttujaan 
*/

const api_key = process.env.REACT_APP_API_KEY


const WeatherInfo = ({ selectedCountries, temperature, wind, weatherIcon }) => {
  if(!selectedCountries) {
    return  
  }
  if(selectedCountries.length == 1) {
    const iconSrc = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'
    console.log('iconSrc',iconSrc);
    return (
      <div>
        <h3> Weather in {selectedCountries[0].capital} </h3>
        <div> temperature {temperature} Celsius </div>
        <img src={iconSrc} />        
        <div> wind {wind} m/s </div>
      </div> 
      )
  }
}

const CountryLine = ({ country, onClick }) => {
  return (
    <li>
      {country.name.common} 
      <button onClick={onClick}>'show'</button>      
    </li> )
}

const Countries = ({selectedCountries, onClick}) => {
  if(!selectedCountries) {
    return 
      <p> No matches, specify another filter </p>
  }
  if(selectedCountries.length == 0) {
    return 
      <p> No matches, specify another filter </p>
  }
  if(selectedCountries.length > 10) {
    return 
      <p> Too many matches, specify another filter </p>
  }

  if(selectedCountries.length > 1) {
    return ( 
      <ul>
        {selectedCountries.map(country => 
            <CountryLine key={country.name.common} country={country} onClick={() => onClick(country.name.common)} />
        )}
      </ul>
    )
  }

  if(selectedCountries.length == 1) {
    let languages = Object.values(selectedCountries[0].languages);

    const flag = selectedCountries[0].flags.png
    return (
      <div>
        <h1> {selectedCountries[0].name.common} {selectedCountries[0].flag} </h1>
        <div> capital: {selectedCountries[0].capital} </div>
        <div> area: {selectedCountries[0].area} </div>
        <p> languages:  </p>
        <ul>
          {languages.map(lan => <li> {lan} </li>)}
        </ul>
        <img src={flag} width="150"  />        
      </div>
    )
  }
}

const App = () => {
  const [newFilter, setNewFilter] = useState(null)
  const [allCountries, setAllCountries] = useState(null)
  const [selectedCountries, setSelectedCountries] = useState(null)

  const [newWeatherNeeded, setNewWeatherNeeded] = useState(false)
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)
  const [weatherIcon, setWeatherIcon] =  useState("")

  const handleChange2 = (event) => {
    const tempFilter = event.target.value
    console.log('filter...',tempFilter);
    setNewFilter(tempFilter)

    const filteredCountries = 
    allCountries.filter(country => country.name.common.toLowerCase().includes(tempFilter.toLowerCase()))
    var len = filteredCountries.length
    console.log('...len...',len);
    setSelectedCountries(filteredCountries)

    if (len == 1) {
      console.log('newWeatherNeede',true);
      setNewWeatherNeeded(true)
    }
    else {
      console.log('newWeatherNeede',false);
      setNewWeatherNeeded(false)
    }
  }


  useEffect(() => {
    console.log('effect run, filter is now', newFilter)
    
    // skip if countries already ferched
    if (! allCountries) {
      console.log('fetching country info...')
      axios
      .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          setAllCountries(response.data)
          setSelectedCountries(response.data)
          if (response.data.lenght == 1) {
            console.log('newWeatherNeede',true);
            setNewWeatherNeeded(true)
          }
          else {
            console.log('newWeatherNeede',false);
            setNewWeatherNeeded(false)
          }
      
        })
        .catch( error => {
        })
    }
//    /* fetch new weather info */
    if (newWeatherNeeded) {
      var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?'
      const lat = selectedCountries[0].latlng[0]
      const lon = selectedCountries[0].latlng[1]
      weatherURL = weatherURL + `lat=${lat}&lon=${lon}&mode=json`
      weatherURL = weatherURL + `&appid=${api_key}`
      console.log('weatherURL',weatherURL);
      
      axios
      .get(weatherURL)
        .then(response => {
          console.log('## new weather data ###:', response.data)
          const localWind = response.data.wind.speed
          const localTemperature = Math.floor((response.data.main.temp - 273.15) * 100) / 100
          const localIcon = response.data.weather[0].icon
          console.log('response.data.weather.icon',localIcon);
          setTemperature(localTemperature)
          setWind(localWind)
          setWeatherIcon(localIcon)
        })
        .catch( error => {
          setTemperature(0)
          setWind(0)
          setWeatherIcon("10n")
          console.log('newWeatherNeede',false);
          setNewWeatherNeeded(false)
            })


    }
  }, [selectedCountries])

  
  console.log('rendering1....');

  const handleSelectCountry = (countryName) => {    
    const selectedCountry = allCountries.find(c => c.name.common === countryName)
    const localCopyCountry = { ...selectedCountry}
    const localCountryList = []
    localCountryList.push(localCopyCountry)
    setSelectedCountries(localCountryList)
    setNewWeatherNeeded(true)
    setNewFilter(countryName)
  }

  return (
    <div>
      <div>
        find countries: <input filter={newFilter} onChange={handleChange2} />
      </div> 
      <div>
        <Countries selectedCountries={selectedCountries} onClick={handleSelectCountry}/>        
      </div>    
      <div>
        <WeatherInfo selectedCountries={selectedCountries} temperature={temperature} wind={wind} weatherIcon={weatherIcon}/>        
      </div>    
    </div>
  )
}


export default App