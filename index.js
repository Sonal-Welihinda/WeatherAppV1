async function weatherApiCall(cityCode){
    if(cityCode == null){
        return 403;
    }
    
    let params = {
        id: cityCode,
        units: "metric",
        appid: apiKeyWeather
    };
    
    // Create a URLSearchParams instance from the object
    let query = new URLSearchParams(params);

    // Append the query string to the base URL
    let url = 'http://api.openweathermap.org/data/2.5/group?' + query.toString();

    caches.open("weatherData").then(function(cache) {
        cache.match(url).then(async function(response) {
            if (response) {
                console.log("using Cache");
                return await response.json();
            }
        });
    });

    // Make a fetch request with the URL

    try {
        var response = await fetch(url);
        await caches.open("weatherData").then(function(cache) {
            cache.put(url, response.clone()).then(function() {

            });
        });

        
        response = await response.json();

    } catch (error) {
        // Handle the error
        console.error(error);
    }

    return response;

}

// var myCache = {};

async function getCityCodes () {
    var citiesFile = await fetch("./cities.json")
    .then((response) => response.json());

    // console.log(citiesFile.List.length);
    for(let i =0;i<citiesFile.List.length;i++){

        
        let weatherData = await weatherApiCall(citiesFile.List[i]["CityCode"]);

        // myCache[citiesFile.List[i]["CityCode"]] = weatherData;

        let feelLike = weatherData.list[0]['main']['feels_like'];
        let humidity = weatherData.list[0]['main']['humidity'];
        let pressure = weatherData.list[0]['main']['pressure'];
        let temp = weatherData.list[0]['main']['temp'];
        let temp_max = weatherData.list[0]['main']['temp_max'];
        let temp_min = weatherData.list[0]['main']['temp_min'];
        let country = weatherData.list[0]['sys']['country'];
        let sunrise = weatherData.list[0]['sys']['sunrise'];
        let sunset = weatherData.list[0]['sys']['sunset'];
        let cityName = weatherData.list[0]['name'];
        let visibility = weatherData.list[0]['visibility'];
        let date = weatherData.list[0]['dt'];
        let icon = weatherData.list[0]['weather'][0]['icon'];
        let description = weatherData.list[0]['weather'][0]['description'];
        let windDeg = weatherData.list[0]['wind']['deg'];
        let windSpeed = weatherData.list[0]['wind']['speed']
        
        renderWeatherCard(citiesFile.List[i]["CityCode"],cityName,country,date,description,temp,temp_min,temp_max,pressure,humidity,sunrise,sunset,windDeg,windSpeed,visibility,icon);
        // document.getElementById(citiesFile.List[i]["CityCode"]).
        // console.log(feelLike,humidity,pressure,temp,temp_max,temp_min,country,name);
        // console.log(weatherData.list);
    }

    // console.log(myCache);
    
}
// getCityCodes();


function cacheManagement(){

    getCityCodes ();
    setInterval(async function(){
        await caches.open("weatherData").then(async function(cache) {
            caches.keys().then(function(names) {
                for (let name of names)
                    caches.delete(name);
            });
        });

        
    },300000);

    

}

cacheManagement();

var whichMethod = "";
function onClickWeatherCardOpen(weatherCityCode){
    let getAllWeatherCards = document.getElementsByClassName("weather-card");
    
    if(whichMethod=="Close"||whichMethod=="Remove"){
        whichMethod = "";
        return;
    }

    for(let i =0;i<getAllWeatherCards.length;i++){


        if(getAllWeatherCards[i].id != weatherCityCode){

            getAllWeatherCards[i].classList.add("hideCard");
            
        }else{
            getAllWeatherCards[i].classList.add("active");

        }
    }
}


function onClickWeatherCardClose(weatherCityCode,event){
   
    whichMethod = "Close";

    let getAllWeatherCards = document.getElementsByClassName("weather-card");
    

    for(let i =0;i<getAllWeatherCards.length;i++){

        if(getAllWeatherCards[i].id != weatherCityCode){
            getAllWeatherCards[i].classList.remove("hideCard");
            // console.log("rev");
            
        }else{
            getAllWeatherCards[i].classList.remove("active");
            // console.log("revmove");

        }
    }

    

}

function removeWeatherCard(weatherCityCode){
    whichMethod = "Remove";
    var weatherCard = document.getElementById(weatherCityCode);
    weatherCard.remove()
}

// apitest()