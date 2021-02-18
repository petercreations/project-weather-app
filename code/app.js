//Variables
const weatherSection = document.getElementById('weatherSection');
const forecast = document.getElementById('forecast');

//Cape Town Weather API
const capeTownForecast = 'https://api.openweathermap.org/data/2.5/forecast?id=3369157&units=metric&appid=3b3dfc4920c50815af4eaabe044bdc31';
const capeTownWeather = 'https://api.openweathermap.org/data/2.5/weather?id=3369157&units=metric&appid=3b3dfc4920c50815af4eaabe044bdc31';


let returnWeekDay = (date) => { 
  let daysInWeek = ["Sunday", "Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"];
  let inputDate = new Date(date.replace(' ', 'T'));
  return daysInWeek[inputDate.getDay()];
}

// Fetch Cape Town current weather
const fetchTodaysWeather = () => {
fetch(capeTownWeather)
  .then((response) => {
    if (response.ok) {
    return response.json()
    } else {
      throw "Error";
    }
  })
  .then((json)=> {
    let tempToday = `${json.main.temp}`
    let tempTodayRounded = Math.round(tempToday)
    let cityName = json.name;
    let weatherDescription = json.weather[0].description;
    let iconId = json.weather[0].icon;
    let sunriseAPI = `${json.sys.sunrise}`
    let sunsetAPI = `${json.sys.sunset}`
    let sunrise = new Date(sunriseAPI*1000).toLocaleTimeString([], {timeStyle: 'short'});
    let sunset = new Date(sunsetAPI*1000).toLocaleTimeString([], {timeStyle: 'short'});

    weatherSection.innerHTML = `
    <div class="current-weather">
      <div>
        <h2 class="current-temp">${tempTodayRounded} <span class="celsius">°C</span> </h2>
        <h1>${cityName}</h1>  
        <h3>${weatherDescription} </h3>
      </div>
      <div class="weather-icon">
        <img class="current-icon" src="http://openweathermap.org/img/wn/${iconId}@2x.png">
      </div>
    </div>
    <div class="sunrise-sunset">
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>
    </div> 
    `
  })
  .catch(error => {
    weatherSection.innerHTML = `${error}`
  })
}
  

// Fetch Cape Town 5 Day Forecast
const fetch5DayForecast = () => {
fetch(capeTownForecast)
  .then((response) => {
    if (response.ok) {
    return response.json()
    } else {
      throw "Error";
    }
  })
  .then((json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast);

    filteredForecast.forEach((filteredForecast) => {
      let dayInWeek = returnWeekDay(filteredForecast.dt_txt);
      let temp5Days = `${filteredForecast.main.temp}`
      let temp5DaysRounded = Math.round(temp5Days)
      let iconId = filteredForecast.weather[0].icon;
      forecast.innerHTML += `
      <div class="five-day-forecast">
        <p> ${dayInWeek}:</p>
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${iconId}@2x.png">
        <p> ${temp5DaysRounded}°C </p>
      </div>
      `
    })
  })
  .catch(error => {
    filteredForecast.innerHTML = `${error}`
  })
};

  

fetchTodaysWeather(); 
fetch5DayForecast();