// Global Variables
let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temperature");

//APIs
const capeTown = 'http://api.openweathermap.org/data/2.5/weather?id=3369157&units=metric&appid=3b3dfc4920c50815af4eaabe044bdc31';

const weatherApp = () => {
  fetch(capeTown)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
    cityName.innerHTML = json.name;
    temperature.innerHTML = `${json.main.temp}℃`;
    });
};
weatherApp();
