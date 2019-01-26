// open weather map api
// https://openweathermap.org/api
// user can enter zip code and return the current weather of that zip code

// http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=27c261aa5ec6c6dc1ab38d473048b64d
const OPEN_WEATHER_KEY = "&appid=27c261aa5ec6c6dc1ab38d473048b64d";
const OPEN_WEATHER_DAILY_LINK =
  "https://api.openweathermap.org/data/2.5/weather?zip=";
const OPEN_WEATHER_FORCAST_LINK =
  "https://api.openweathermap.org/data/2.5/forecast?zip=";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let getCurrentData = async (zipCode, tempType) => {
  await fetch(OPEN_WEATHER_DAILY_LINK + zipCode + OPEN_WEATHER_KEY + tempType)
    .then(res => res.json())
    .then(dailyTemp => {
      $("#temp").addClass("temp-active");
      $("#temp").html(`
                <div id="js-result">
                    <p>Current</p>
                    <p id='current'>${dailyTemp.main.temp}°</p>
                    <p>Upcoming Week</p>
                    <div id='forecast'></div>
                </div>
            `);
    });
};

let getForcastData = async (zipCode, tempType) => {
  await fetch(OPEN_WEATHER_FORCAST_LINK + zipCode + OPEN_WEATHER_KEY + tempType)
    .then(res => res.json())
    .then(forcastTemp => {
      forcastTemp.list.map(item => {
        let d = new Date(item.dt_txt);
        if (d.getHours() === 12) {
          $("#forecast").append(`
                    <div class='forecast-wrap'>
                        <p class='forecast-date'>${days[d.getDay()]}</p>
                        <p class='forecast-temp'>${item.main.temp}°</p>
                    </div>
                    `);
        }
      });
    });
};

let submitEvent = () => {
  $("#js-submit").submit(e => {
    e.preventDefault();
    let zipCode = $("#js-zip-code").val();
    let tempType = $("input[name=weather-type]:checked").val();
    tempType = "&units=" + tempType;
    getCurrentData(zipCode, tempType);
    getForcastData(zipCode, tempType);
  });
};

$(submitEvent);
