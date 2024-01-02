// wrap everything in a call to jQuery
$(function (){
    var weather; //create an object to store the weather
    var apiKey = '999d8c94a5b075191ec274724647d4c0';

    // Function to search up the weather
    function searchWeather (event) {
        event.stopPropagation(); //stop event propagation
        // store city input as variable, to then search up coordinates via geocoding api
        var cityName = $('#city-search').val();
        console.log(cityName)
        var cityCoord = $.ajax({
                url : `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
        })
        console.log(cityCoord)
        cityCoordParse = cityCoord.responseText;
        console.log(cityCoordParse);
    }


   // listen to the search button
   $('button').click(searchWeather) 
})
