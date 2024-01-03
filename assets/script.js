// wrap everything in a call to jQuery
$(function () {
    var weatherForecast; //create an object to store the five day weather
    var weatherCurrent; // create an object to store current weather
    var apiKey = '999d8c94a5b075191ec274724647d4c0';

    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=`;
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`;


    // generate page content for the weather



    // Function to search up the weather
    function searchWeather(event) {
        event.stopPropagation(); //stop event propagation
        // store city input as variable
        var cityName = $('#city-search').val();
        // concatinate city name into URLs
        var appendedForecastURL = forecastURL + cityName;
        var appendedWeatherURL = weatherURL + cityName;

        // add city to local storage
        var history = JSON.parse(localStorage.getItem('weather history'))|| [];
        console.log(history)

        
        // check that current city is not in search history
        if (!history.includes(cityName.toLowerCase())) {
            $('#search').append(`<button id="history">${cityName}</button>`)
            // add city name to history array
            history.push(cityName.toLowerCase())
            // push the history array back to local storage
            localStorage.setItem('weather history', JSON.stringify(history));
        }

        // call the server to get forecast data
        $.get(appendedForecastURL)
            .then(function (data) {
                weatherForecast = data;
                console.log(weatherForecast);
            })

        // call the server to get the current weather
        $.get(appendedWeatherURL)
            .then(function (data) {
                weatherCurrent = data;

                console.log(weatherCurrent)
            })
    }


    // listen to the search button
    $('#search-btn').click(searchWeather)

})
