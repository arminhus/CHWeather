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
    .then(res => {
      if (res.status === 404) {
        alert(zipCode + " is not valid, please enter a valid zip code");
      }
      return res.json();
    })
    .then(dailyTemp => {
      console.log(dailyTemp.weather[0].main);
      $("#temp").addClass("temp-active");
      $("#temp").html(`
                <div id="js-result">
                    <p class="weather-title">Current</p>
                    <div id='current'>
                    <p id=''>${dailyTemp.main.temp}°</p>
                    <p class='weather-text'>${dailyTemp.weather[0].main}</p>
                    ${wConditionDisplay(dailyTemp)}
                    </div>
                    <p class="weather-title">Upcoming Week</p>
                    <div id='forecast'></div>
                </div>
            `);
    })
    .catch(err => console.log(err));
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
                        <p class='weather-text'>${item.weather[0].main}</p>
                        ${wConditionDisplay(item)}
                    </div>
                    `);
        }
      });
    });
};
let wConditionDisplay = item => {
  let imgArr = [
    "img/cloudy.png",
    "img/clear.png",
    "img/rain.png",
    "img/snow.png",
    "img/mist.png",
    "img/thunder.png"
  ];
  let weatherType = item.weather[0].main;
  console.log(weatherType);
  let img = img => `<img class="weather-type" src=${img} alt=${weatherType}>`;
  switch (weatherType.toLowerCase()) {
    case "clouds":
      return img(imgArr[0]);
    case "clear":
      return img(imgArr[1]);
    case "rain":
      return img(imgArr[2]);
    case "snow":
      return img(imgArr[3]);
    case "mist":
      return img(imgArr[4]);
    case startsWith("thunder"):
      return img(imgArr[5]);
    default:
      return null;
  }
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
