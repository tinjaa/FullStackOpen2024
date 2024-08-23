import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = (props) => {
    const [weather, setWeather] = useState([])
    const [weatherIcon, setWeatherIcon] = useState('')
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const params = {
        access_key: API_KEY,
        query: props.country.capital[0]
    }

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current',{params})
            .then(response => {
                console.log(response.data.current)
                setWeather(response.data.current)
                setWeatherIcon(response.data.current.weather_icons[0])
            }).catch(error => {
                console.log(error)
            })
    }, [])     
     

    const languages = Object.values(props.country.languages)


    const windPerSecond = (weather.wind_speed * 1000) /3600
    const parsedWind = parseFloat(windPerSecond.toFixed(2))
    
    return (
        <div>
            <h2>{props.country.name.common}</h2>
            <p>capital: {props.country.capital}
            <br></br>
            area: {props.country.area}</p>
            <h3>languages</h3>
            <ul>{languages.map(language =>
                <li key={language}>
                    {language}                           
                </li>)}
            </ul>
            <img src={props.country.flags.svg} width="200" height="150"></img>
            <h3>Weather in {props.country.capital}</h3>
            <p>temperature {weather.temperature} Celcius</p>
            <img src={weatherIcon} width="100" height="100"></img>
            <p>wind {parsedWind} m/s</p>
        </div>
    )
}

export default Country