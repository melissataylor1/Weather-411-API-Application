    // my api key
    var weatherApiKey =  "2b607860bec061627a4d53da7828381b";
    // other variables
    var searchBtn = document.getElementById("search-button");
    var searchInput = document.getElementById("city-input");
    var historyContainer = document.getElementById("search-history");
    var cityName = document.getElementById("city-name");
    var temp = document.getElementById("temperature");
    var humidity = document.getElementById("humidity");
    var wind = document.getElementById("wind");
    var fiveDay = document.getElementById("five-day");
    var searchHistoryArr = JSON.parse(localStorage.getItem('searchHistory')) || [];
    var currentIconEl = document.getElementById ("weather-icon");
    const clearEl = document.getElementById ("clear-history");
    const ViewEl = document.getElementById ("view-history");

 
function getInfo() {
    // takes what user inputs in search bar and puts in openweather url with API key to search for city
    var city = searchInput.value;
    // for current weather
    var currentUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      weatherApiKey;
      // for 5 day weather
    var forecastUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      weatherApiKey;


      $(".removeRow").remove();
}