// wrap everything in a call to jQuery

    var weatherForecast; //create an object to store the five day weather
    var weatherCurrent; // create an object to store current weather
    var apiKey = '999d8c94a5b075191ec274724647d4c0'; // api key for open weather api
    // api urls for forecast and current weather
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=`;
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`;
    
    var spin = false; // tracks if the page is spinning



    // function to load search history
    function loadHistory () {
        var history = JSON.parse(localStorage.getItem('weather history'))
        // if there is search history, generate a button for each item
        // if history returns null, there is no history so don't bother loading anything
        if (history){
            for (var index = 0; index < history.length; index++) {
                $('#search').append(`<button class="history">${history[index]}</button>`)
            }
        }
    }

    // disect current weather data object, and populate the page with the information
    // city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
    function currentWeather(weatherObj){
        // read data from weatherObj
        var cityName = weatherObj.name;
        var date = dayjs().format('MMMM D, YYYY')
        var iconID = weatherObj.weather[0].icon
        var iconUrl = `http://openweathermap.org/img/wn/${iconID}@2x.png`
        var description = weatherObj.weather[0].description;
        // get weather and convert from kelvin to celsius
        var temperature = Math.round(weatherObj.main.temp - 273)
        var tempMin = Math.round(weatherObj.main.temp_min - 273)
        var tempMax = Math.round(weatherObj.main.temp_max - 273)
        var humidity = weatherObj.main.humidity
        var windSpeed = weatherObj.wind.speed // in m/s

        //empty the current weather div
        $('#current-weather').empty();
        $('#current-weather').append(`<h3>${cityName}</h3>      <h3>${date}</h3>
        <img src=${iconUrl} alt=${description}>
        <p>Temperature: ${temperature} &#176;C</p>
        <p>Daily Hi/Lo: ${tempMax}/${tempMin} &#176;C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind speed: ${windSpeed} m/s</p>`)
    }

    // disect forecast weather data object, and populate the page with the information
    function forecastWeather(weatherObj){
        var date
        var icon
        var temperature
        var humidity
        var windSpeed
    }

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
            $('#search').append(`<button class="history">${cityName}</button>`)
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
                forecastWeather(weatherForecast);
            })

        // call the server to get the current weather
        $.get(appendedWeatherURL)
            .then(function (data) {
                weatherCurrent = data;
                console.log(weatherCurrent)
                currentWeather(weatherCurrent);
            })
    }

    // set button value to the textbox value and call the get weather function
    function historyWeather (event) {
        var cityName = $(this).text(); // get cityName from the button text
        console.log(cityName);
        $('#city-search').val(cityName); 
        searchWeather(event);
    }

    // We must make it spin, Jojo
    function spinME () {
        if (!spin) { // if it's not spinning, change that
            // add class to make things spin
            $("body > :not(header) > *").addClass('fa-spin')
            $("main, div").addClass('fa-spin')
            // toggle spin boolean
            spin = true;
        } else{
            // remove class that makes things spin
            $("body > :not(header) > *").removeClass('fa-spin')
            $("main, div").removeClass('fa-spin')
            // toggle spin boolean
            spin = false;
        }
    }

    // load the history in as buttons
    loadHistory();
    // listen to the #search div for the history buttons
    $('#search').on('click', '.history', historyWeather)
    // listen to the search button
    $('#search-btn').click(searchWeather)
    // listen to the spin button 
    $('.spin').click(spinME)


