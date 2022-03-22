
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
    clear()

})

function clear() {
    // Clear Current Text
    $("#current-date").text("Date: ")
    $("#current-temp").text("Temp: ")
    $("#current-humidity").text("Humidity: ")
    $("#current-wspeed").text("Wind Speed: ")
    $("#current-uv").text("UV Index: ")

    // Clear Current Icon
    $("#current-icon").children().attr("src", "")

    // Clear Five Day Forecast Text
    $("#d1").text("")
    $("#d1-temp").text("")
    $("#d1-humidity").text("")
    $("#d2").text("")
    $("#d2-temp").text("")
    $("#d2-humidity").text("")
    $("#d3").text("")
    $("#d3-temp").text("")
    $("#d3-humidity").text("")
    $("#d4").text("")
    $("#d4-temp").text("")
    $("#d4-humidity").text("")
    $("#d5").text("")
    $("#d5-temp").text("")
    $("#d5-humidity").text("")
}

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

        // Day One Temp
        const dayOneTemp = day5.list[0].main.temp
        console.log(dayOneTemp);
        $("#d1-temp").append('Temp: ', dayOneTemp + " &#8457;")

        // Day One Humidity
        const dayOneHumid = day5.list[0].main.humidity
        console.log(dayOneHumid);
        $("#d1-humidity").append('Humidity: ', dayOneHumid + "%")

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

        // Day Two Temp
        const dayTwoTemp = day5.list[8].main.temp
        console.log(dayTwoTemp);
        $("#d2-temp").append('Temp: ', dayTwoTemp + " &#8457;")

        // Day Two Humidity
        const dayTwoHumid = day5.list[8].main.humidity
        console.log(dayTwoHumid);
        $("#d2-humidity").append('Humidity: ', dayTwoHumid + "%")

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

        // Day Three Temp
        const dayThreeTemp = day5.list[16].main.temp
        console.log(dayThreeTemp);
        $("#d3-temp").append('Temp: ', dayThreeTemp + " &#8457;")

        // Day Three Humidity
        const dayThreeHumid = day5.list[16].main.humidity
        console.log(dayThreeHumid);
        $("#d3-humidity").append('Humidity: ', dayThreeHumid + "%")

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

        // Day Four Temp
        const dayFourTemp = day5.list[24].main.temp
        console.log(dayFourTemp);
        $("#d4-temp").append('Temp: ', dayFourTemp + " &#8457;")

        // Day Four Humidity
        const dayFourHumid = day5.list[24].main.humidity
        console.log(dayFourHumid);
        $("#d4-humidity").append('Humidity: ', dayFourHumid + "%")

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

        // Day Five Temp
        const dayFiveTemp = day5.list[32].main.temp
        console.log(dayFiveTemp);
        $("#d5-temp").append('Temp: ', dayFiveTemp + " &#8457;")

        // Day Five Humidity
        const dayFiveHumid = day5.list[32].main.humidity
        console.log(dayFiveHumid);
        $("#d5-humidity").append('Humidity: ', dayFiveHumid + "%")
    })
}
