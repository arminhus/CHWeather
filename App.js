// open weather map api
// https://openweathermap.org/api
// user can enter zip code and return the current weather of that zip code

// http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=27c261aa5ec6c6dc1ab38d473048b64d
const OPEN_WEATHER_KEY = '&appid=27c261aa5ec6c6dc1ab38d473048b64d';
const OPEN_WEATHER_DAILY_LINK = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const OPEN_WEATHER_FORCAST_LINK = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let getCurrentData = (zipCode, tempType) => {
    // $.getJSON(OPEN_WEATHER_DAILY_LINK + zipCode + OPEN_WEATHER_KEY + tempType, data => {
    //     console.log('DATA' + data);
    //     displayResults(data);
    //     getForcastData(zipCode, tempType, data);
    // });
    console.log(OPEN_WEATHER_DAILY_LINK + zipCode + OPEN_WEATHER_KEY + tempType);
    fetch(OPEN_WEATHER_DAILY_LINK + zipCode + OPEN_WEATHER_KEY + tempType)
        .then(res => res.json())
        .then(dailyTemp => $("#temp").html(`
    
         <div id="js-result">
                 <p>Current</p>
                 <p id='temp'>${dailyTemp.main.temp}°</p>
                 <p>Upcoming Week</p>
                 <div id='forecast'></div>
             </div>
         `));
};

let getForcastData = (zipCode, tempType, data) => {
    // $.getJSON(OPEN_WEATHER_FORCAST_LINK + zipCode + OPEN_WEATHER_KEY + tempType, fData => {
    //     // console.log(fData);
    //     displayForcastResults(fData, data);
    // });
    fetch(OPEN_WEATHER_FORCAST_LINK + zipCode + OPEN_WEATHER_KEY + tempType)
        .then(res => res.json())
        .then(forcastTemp => {

            return forcastTemp.list.map(item => {
                let d = new Date(item.dt_txt)
                if (d.getHours() === 12) {
                    // console.log(item.dt_txt, item.main.temp);
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

let displayResults = (dailyTemp) => {
    console.log(dailyTemp.main.temp);
    $("#temp").html(dailyTemp.main.temp);
    // return dailyTemp.main.temp;

};

let displayForcastResults = (forcastTemp) => {
    console.log("HERE IS THE FORCASTTEMP" + forcastTemp);
    forcastTemp.list.map(item => {
        let d = new Date()
        let d2 = new Date(item.dt_txt)
        console.log(d.getDay(), d2)
    })
    $('#result-main').html(`
    
    <div id="js-result">
            <p>Current</p>
            <p id='temp'>${'hi'}°</p>
            <p>Upcoming Week</p>
            <div id='forecast'></div>
        </div>
    `)

    return forcastTemp.list.map(item => {
        let d = new Date(item.dt_txt)
        if (d.getHours() === 12) {
            // console.log(item.dt_txt, item.main.temp);
            $("#forecast").append(`
            <div class='forecast-wrap'>
            <p class='forecast-date'>${days[d.getDay()]}</p>
            <p class='forecast-temp'>${item.main.temp}°</p>
            </div>
            `);
        }
    });
};

let submitEvent = () => {
    $('#js-submit').submit(e => {
        e.preventDefault();
        let zipCode = $('#js-zip-code').val();
        let tempType = $("input[name=weather-type]:checked").val();
        tempType = '&units=' + tempType;
        getCurrentData(zipCode, tempType);
        getForcastData(zipCode, tempType);
    });
};

$(submitEvent)