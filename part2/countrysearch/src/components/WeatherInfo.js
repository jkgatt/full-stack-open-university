const WeatherInfo = ({countryName, weatherData}) => {

    console.log(weatherData)
    if(Object.keys(weatherData).length === 0){
        return (
            <p>Weather information loading...</p>
        )
    }
    return (
        <div>
            <p>Tempreture: {weatherData.main.temp}</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} width="200" alt={`${countryName} weather`} />
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
    )
} 

export default WeatherInfo