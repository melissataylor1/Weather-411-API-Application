function initPage() {
    const cityEl = document.getElementById ("city-input");
    const searchEl = document.getElementById ("search-button");
    const clearEl = document.getElementById ("clear-history");
    const viewEl = document.getElementById ("view-history");
    const nameEl = document.getElementById ("city-name");
    const currentIconEl = document.getElementById ("weatherIcon");
    const currentTempEl = document.getElementById ("temperature");
    const currentHumEl = document.getElementById ("humidity");
    const currentWindEl = document.getElementById ("windspeed");
    const historyEl = document.getElementById("search-history")
    var fivedayEl = document.getElementById ("five-day");
    var currentWeatherEl = document.getElementById("current-weather");

    
    // Assigning API to variable //
    const weatherApiKey =  "2b607860bec061627a4d53da7828381b";

    function weatherInfo(cityName) {
        // Current weather get request from Open Weather API //
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + myapiKey;
        axios.get(queryURL)
    }
}