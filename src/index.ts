const APIKEY = '83e0ac673d0544135c27cd6fd5c3835c'

const cityName = document.getElementById('city')
const weatherDescription = document.getElementById('description')
const temperature = document.getElementById('temp')
const temperatureMax = document.getElementById('temp-max')
const temperatureMin = document.getElementById('temp-min')
const windSpeed = document.getElementById('wind')
const windDirection = document.getElementById('wind-direction')
const humidity = document.getElementById('humidity')
const gps = document.getElementsByClassName('gps')
const btnSearch = document.getElementById('search-btn')
const btnGps = document.getElementById('gps-btn')

// 1st step: gps position 
//function#1 : gps navigateur
function gpsApi() {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        console.log(position.coords.latitude, position.coords.longitude);
        let urlGps = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric&exclude=minutely,alerts&lang=fr`
        fetch(urlGps)
            .then(response => response.json().then((data) => {
                console.log(data)

                cityName.innerHTML = data.name;
                weatherDescription.innerHTML = data.weather[0].description.toUpperCase() + "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
                temperature.innerHTML = "<i class='fas fa-thermometer-three-quarters'></i>" + Math.round(data.main.temp) + '°C';
                temperatureMax.innerHTML = "<i class='fas fa-thermometer-three-quarters'></i> " + Math.round(data.main.temp_max) + ' °C';
                temperatureMin.innerHTML = "<i class='fas fa-thermometer-three-quarters'></i> " + Math.round(data.main.temp_min) + ' °C';
                windSpeed.innerHTML = "<i class='fas fa-wind'></i> " + Math.round(data.wind.speed * 3.6) + ' km/h';
                windDirection.innerHTML = "<i class='fas fa-arrow-up' style='transform: rotate(" + data.wind.deg + "deg" + ")' ></i> " + data.wind.deg + ' °';
                humidity.innerHTML = "<i class='fas fa-tint'></i> " + data.main.humidity + '%';
                console.log(data.wind.deg)
            }))
            .catch((err) => console.log("Erreur : " + err));

    });



}





//2nd STEP : Appel a l'api avec ville en parametre de fonction
function apiCallByCityName(city: string) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&appid=${APIKEY}&units=metric&exclude=minutely,alerts&lang=fr`

    fetch(url)
        .then(response => response.json().then((data) => {
            //console.log(data);
            cityName.innerHTML = data.name;
            weatherDescription.innerHTML = data.weather[0].description.toUpperCase() + "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
            temperature.innerHTML = "<i class='fas fa-thermometer-three-quarters'></i> " + Math.round(data.main.temp) + ' °C';
            temperatureMax.innerHTML = "<i class='fas fa-thermometer-three-quarters'></i> " + Math.round(data.main.temp_max) + ' °C';
            temperatureMin.innerHTML = "<i class='fas fa-thermometer-three-quarters'></i> " + Math.round(data.main.temp_min) + ' °C';
            windSpeed.innerHTML = "<i class='fas fa-wind'></i> " + Math.round(data.wind.speed * 3.6) + ' km/h';
            windDirection.innerHTML = "<i class='fas fa-arrow-up' style='transform: rotate(" + data.wind.deg + "deg" + ")' ></i> " + data.wind.deg + ' °';
            humidity.innerHTML = "<i class='fas fa-tint'></i> " + data.main.humidity + '%';
            console.log(data.wind.deg)
        }))
        .catch((err) => console.log("Erreur : " + err));
}



//Button Rechercher
btnSearch.addEventListener('click', function (e) {
    e.preventDefault();
    //@ts-ignore
    let ville = document.querySelector('#inputCity').value;
    apiCallByCityName(ville)
})

//Button Gps
btnGps.addEventListener('click', function (e) {
    e.preventDefault();
    //@ts-ignore
    gpsApi()
})




apiCallByCityName('Carbonne')

