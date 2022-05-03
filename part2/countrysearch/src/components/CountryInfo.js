import axios from "axios"
import { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({countryInfo}) => {
    const [weatherData, setWeatherData] = useState({})

    const open_weather_api_key = process.env.REACT_APP_OPEN_API_WEATHER_KEY;
    const open_weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${countryInfo.latlng[0]}&lon=${countryInfo.latlng[1]}&appid=${open_weather_api_key}`

    useEffect(() => {
        axios
            .get(open_weather_url)
            .then(response => setWeatherData(response.data))
    }, [])

    return (
    <div>
        <h2>{countryInfo.name.common}</h2>
        <p>Capital: {countryInfo.capital}</p>
        <p>Area: {countryInfo.area}</p>
        <p>Languages:</p>
        <ul>
            {Object.values(countryInfo.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={countryInfo.flags.png} width="200" alt={`${countryInfo.name.common} flag`} />
        <h3>Weather in {countryInfo.capital}</h3>
        <WeatherInfo weatherData={weatherData} countryName={countryInfo.name.common}/>
    </div>
    )
}

export default CountryInfo