// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV i
// WHEN I view the UV i
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day day5 that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city day5

// Weather API
const apiKey = "c972785c6cce92cd4ef6abedf6d41f9a";

// Button Click Function
// Reference variable for user input
$("#search-btn").on("click", function searchButton() {
    // console.log('hello')
    // declares a variable newDiv
    var newDiv = $("<div>");
    // declares a variable named input and sets it as the value of the user input
    var input = $("#user-input").val();
    console.log(input)
    // if there is something in the input field add it to the local storage and display in the newdiv
    if (input) {
        localStorage.setItem(input, "");
        $("#previous-search").append(newDiv)
        newDiv.prepend(input)
    }
})

// 1 Day day5
function oneDay(city) {
    var urlOneDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: urlOneDay,
        method: "GET"
    }).then(function (response) {
        console.log(urlOneDay)
        console.log(response)

        const date = moment().format("MM/DD/YYYY")
        console.log(date);
        $("#current-date").append(" " + date)

        const temp = response.main.temp;
        console.log(temp)
        $("#current-temp").append(" " + temp + " &#8457;")

        // // humidity
        const humid = response.main.humidity;
        console.log(humid)
        $("#current-humidity").append(" " + humid + " %")

        // wind speed
        const windSpeed = response.wind.speed;
        console.log(windSpeed)
        $("#current-wspeed").append(" " + windSpeed + " mph")

        // icon

        // uv
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var urlUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: urlUV,
            method: "GET"
        }).then(function (uvData) {
            console.log(urlUV);
            console.log(uvData);

            var uvVal = uvData.value;
            console.log(uvVal)
            $("#current-uv").append(" " + uvVal)
        })
    })
}
oneDay("Brooklyn")

// Five Day Forecast
function fiveDay(city) {
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/day5?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: urlFiveDay,
        method: "GET"
    }).then(function (day5) {
        console.log(day5)

        // set variable for the date and display it in moment.js format
        var dayOne = moment(day5.list[0].dt_text).format("MM/DD")
        // overwrite day1 placeholder
        $("#d1").append(dayOne)

        // set variable for the date and display it in moment.js format
        var dayTwo = moment(day5.list[8].dt_text).format("MM/DD")
        // overwrite day1 placeholder
        $("#d2").append(dayTwo)

        // set variable for the date and display it in moment.js format
        var dayThree = moment(day5.list[16].dt_text).format("MM/DD")
        // overwrite day1 placeholder
        $("#d3").append(dayThree)

        // set variable for the date and display it in moment.js format
        var dayFour = moment(day5.list[24].dt_text).format("MM/DD")
        // overwrite day1 placeholder
        $("#d4").append(dayFour)

        // set variable for the date and display it in moment.js format
        var dayFive = moment(day5.list[32].dt_text).format("MM/DD")
        // overwrite day1 placeholder
        $("#d5").append(dayFive)

    })
}
fiveDay("Brooklyn")