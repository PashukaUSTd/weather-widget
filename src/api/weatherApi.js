const apiKey = 'e30069ab1c2878cc3874465da6ce395e'

const weatherApi = {
  weather: {
    searchCityCoords: q => `http://api.openweathermap.org/geo/1.0/direct?q=${q}?&appid=${apiKey}`,
    searchWeather: (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    getIcon: icon => `https://api.openweathermap.org/img/w/${icon}.png`
  }
}

export default weatherApi
