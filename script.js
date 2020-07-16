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
    oneDay(input)
    fiveDay(input)
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

        // Humidity
        const humid = response.main.humidity;
        console.log(humid)
        $("#current-humidity").append(" " + humid + " %")

        // Wind Speed
        const windSpeed = response.wind.speed;
        console.log(windSpeed)
        $("#current-wspeed").append(" " + windSpeed + " mph")

        // Current Icon
        console.log(response)
        var currentIcon = response.weather[0].icon
        console.log('This is the icon code: ', currentIcon)
        var currentUrlIcon = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
        var currentIconImg = $("<img>").attr('src', currentUrlIcon)
        $("#current-icon").append(currentIconImg)

        // Day One Icon
        // var iconCode = day5.list[0].weather[0].icon
        // console.log('This is the icon code: ', iconCode)
        // var urlIcon = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
        // var iconImg = $("<img>").attr('src', urlIcon)
        // $("#d1").append(iconImg)


        // UV
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

// Five Day Forecast
function fiveDay(city) {
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: urlFiveDay,
        method: "GET"
    }).then(function (day5) {
        console.log('5 day forecast: ', day5)

        // Day One
        // set variable for the date and display it in moment.js format
        var dayOne = moment(day5.list[0].dt_txt).format("MM/DD")
        // overwrite day1 placeholder
        $("#d1").append(dayOne)

        // Day One Icon
        var iconCode = day5.list[0].weather[0].icon
        console.log('This is the icon code: ', iconCode)
        var urlIcon = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
        var iconImg = $("<img>").attr('src', urlIcon)
        $("#d1").append(iconImg)

        // Day Two
        // set variable for the date and display it in moment.js format
        var dayTwo = moment(day5.list[8].dt_txt).format("MM/DD")
        // overwrite day2 placeholder
        $("#d2").append(dayTwo)

        // Day Two Icon
        var iconCode2 = day5.list[8].weather[0].icon
        console.log('This is the icon code: ', iconCode2)
        var urlIcon2 = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
        var iconImg2 = $("<img>").attr('src', urlIcon2)
        $("#d2").append(iconImg2)

        // Day Three
        // set variable for the date and display it in moment.js format
        var dayThree = moment(day5.list[16].dt_txt).format("MM/DD")
        // overwrite day1 placeholder
        $("#d3").append(dayThree)

        // Day Three Icon
        var iconCode3 = day5.list[16].weather[0].icon
        console.log('This is the icon code: ', iconCode3)
        var urlIcon3 = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
        var iconImg3 = $("<img>").attr('src', urlIcon3)
        $("#d3").append(iconImg3)

        // Day Four
        // set variable for the date and display it in moment.js format
        var dayFour = moment(day5.list[24].dt_txt).format("MM/DD")
        // overwrite day1 placeholder
        $("#d4").append(dayFour)

        // Day Four Icon
        var iconCode4 = day5.list[24].weather[0].icon
        console.log('This is the icon code: ', iconCode4)
        var urlIcon4 = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
        var iconImg4 = $("<img>").attr('src', urlIcon4)
        $("#d4").append(iconImg4)

        // Day Five
        // set variable for the date and display it in moment.js format
        var dayFive = moment(day5.list[32].dt_txt).format("MM/DD")
        // overwrite day1 placeholder
        $("#d5").append(dayFive)

        // Day Five Icon
        var iconCode5 = day5.list[32].weather[0].icon
        console.log('This is the icon code: ', iconCode5)
        var urlIcon5 = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
        var iconImg5 = $("<img>").attr('src', urlIcon5)
        $("#d5").append(iconImg5)
    })
}
