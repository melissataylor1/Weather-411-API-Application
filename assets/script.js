$(function () {
    let dayOfWeek = dayjs().format('dddd');
  });
// other variables
function initPage() {
    const cityEl = document.getElementById("city-input");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("city-name");
    const dateEl = document.getElementById("date");
    const currentIconEl = document.getElementById("weather-icon");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");
    const currentWindEl = document.getElementById("windspeed");
    const histEl = document.getElementById("history")
    var fivedayEl = document.getElementById("five-day");
    var currentWeatherEl = document.getElementById("current-weather");
    let searchHist = JSON.parse(localStorage.getItem("search")) || [];

    // my api key
    var myApiKey = "2b607860bec061627a4d53da7828381b";

    function weatherInfo(cityName) {
        
        // Current weather get request from Open Weather API //
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + myApiKey;
        axios.get(queryURL)
            .then(function (response) {

                currentWeatherEl.classList.remove("d-none");

                const currentDate = new Date(response.data.dt * 1000);
        
                nameEl.innerHTML = response.data.name;;
                dateEl.innerHTML = dayjs().format("ddd MM/DD/YYYY");;
                let weatherIcon = response.data.weather[0].icon;
                currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                currentIconEl.setAttribute("alt", response.data.weather[0].description);
                currentTempEl.innerHTML = "Temperature: " + cels(response.data.main.temp) + " &#176C";
                currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

                // Get 5-day forecast for selected city //
                let cityID = response.data.id;
                let weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + myApiKey;
                axios.get(weatherQueryURL)
                    .then(function (response) {
                        fivedayEl.classList.remove("d-none");



                        
                        // 5 day forecast 
                        const forecastEls = document.querySelectorAll(".forecast");
                        for (i = 0; i < forecastEls.length; i++) {
                            forecastEls[i].innerHTML = "";
                            const forecastIndex = i * 8 + 4;
                            const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            const forecastDay = forecastDate.getDate();
                            const forecastMonth = forecastDate.getMonth() + 1;
                            const forecastYear = forecastDate.getFullYear();
                            const forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "mt-3 mb-0 text-center forecast-date");
                            forecastDateEl.innerHTML =forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            forecastEls[i].append(forecastDateEl);

                            // icon function  //
                            const forecastWeatherEl = document.createElement("img");
                            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                            forecastEls[i].append(forecastWeatherEl);
                            const forecastTempEl = document.createElement("p");
                            forecastTempEl.innerHTML = "Temperature: " + cels(response.data.list[forecastIndex].main.temp) + " &#176C";
                            forecastEls[i].append(forecastTempEl);
                            const forecastHumidityEl = document.createElement("p");
                            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                            forecastEls[i].append(forecastHumidityEl);
                            const forecastWindspeedEl = document.createElement("p");
                            forecastWindspeedEl.innerHTML = "Wind Speed: " + response.data.list[forecastIndex].wind.speed + "MPH";
                            forecastEls[i].append(forecastWindspeedEl);
                        }
                    })
            });
    }

    // Kelvin to Celsius function 
    function cels(K) {
        return Math.floor((K - 273.15));
    }

    // Grabs search history form local storage //
    searchEl.addEventListener("click", function () {
        const searchInput = cityEl.value;
        weatherInfo(searchInput);
        searchHist.push(searchInput);
        localStorage.setItem("search", JSON.stringify(searchHist));
        renderSearchHist();
    })

    // Clears search history //
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHist = [];
        renderSearchHist();
    })

    function pastSearchHistory() {
        histEl.innerHTML = ' ';
        var ul = document.createElement('ul');
        for (let i = 0; i < searchHistoryArr.length; i++) {
            var li = document.createElement('li');
            var pastSearch = document.createElement('a');
            pastSearch.href = '#';
            pastSearch.textContent = searchHistoryArr[i];
            li.append(pastSearch);
            ul.append(li);
        }
        historyEl.append(ul);
    }

    function renderSearchHist() {
        histEl.innerHTML = "";
        for (let i = 0; i < searchHist.length; i++) {
            const histItem = document.createElement("input");
            histItem.setAttribute("type", "text");
            histItem.setAttribute("readonly", true);
            histItem.setAttribute("class", "form-control d-block bg-white text-center");
            histItem.setAttribute("value", searchHist[i]);
            histItem.addEventListener("click", function () {
                weatherInfo(histItem.value);
            })
            histEl.append(histItem);
        }
    }

    renderSearchHist();
    if (searchHist.length > 0) {
        weatherInfo(searchHist[searchHist.length - 1]);
    }
}

initPage();

