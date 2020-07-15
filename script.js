// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

// Weather API
const apiKey = "c972785c6cce92cd4ef6abedf6d41f9a";

// 1 Day Forecast
function oneDay(city) {
    console.log(city)
    var urlOneDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    console.log(urlOneDay)

    $.ajax({
        url: urlOneDay,
        method: "GET"
    }).then(function (response) {

        // temp
        const temp = response.main.temp;
        console.log(temp)

        // humidity
        const humid = response.main.humidity;
        console.log(humid)

        // wind speed
        const windSpeed = response.wind.speed;
        console.log(windSpeed)

        // icon

        // uv
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var urlUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: urlUV,
            method: "GET"
        }).then(function (uvData) {
            console.log(urlUV);
            console.log(uvData);

            var uvVal = uvData.value;
            console.log(uvVal)
        })
    })
}
oneDay("Boston")