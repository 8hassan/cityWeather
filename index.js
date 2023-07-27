// ON STARTUP GET THE USER CITY AND DISPLAY THE WEATHER BASED ON THE CITY//

console.log("before");

async function getWeatherByCity(city = document.querySelector("#cityInput").value){
    try{
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d3a7d33379fb26510969122123560018&units=metric`;

        const response = await fetch(weatherApiUrl);
        const data = await response.json();

        const weatherText = document.querySelector("#weatherText");
        const image = document.querySelector("#weatherImage")
        const cityName = document.querySelector("#cityName");
        const humidity = document.querySelector("#humidityPercentage");
        const wind = document.querySelector("#windSpeed");
        

        weatherText.textContent = data.main.temp;
        cityName.textContent = city;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;

        if(data.weather[0].main === "Clear"){
            image.src = "images/clear.png";
        }else if (data.weather[0].main === "Clouds"){
            image.src = "images/clouds.png";
        }else if (data.weather[0].main === "Drizzle"){
            image.src = "images/drizzle.png";
        }else if (data.weather[0].main === "Humidity"){
            image.src = "images/humidity.png";
        }else if (data.weather[0].main === "Mist"){
            image.src = "images/mist.png";
        }else if (data.weather[0].main === "Rain"){
            image.src = "images/rain.png";
        }else if (data.weather[0].main === "snow"){
            image.src = "images/snow.png";
        }else if (data.weather[0].main === "Wind"){
            image.src = "images/wind.png";
        }
    }catch{
        alert("Not a Valid City")
    }

}


async function success(position){
    const latitude = position.coords.latitude;
    const longtitude = position.coords.longtitude;
    const cityApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longtitude}&localityLanguage=en`;

    const response = await fetch(cityApiUrl);
    const data = await response.json();
    let city = data.city;
    console.log(city);

    getWeatherByCity(city);
}

const error = () => {
    console.log("location denied")
}

navigator.geolocation.getCurrentPosition(success, error);

document.querySelector("#search").addEventListener("click", getWeatherByCity);

console.log("after");