const apiKey = '67c3a16d72b7b60fcc579617d0a4e3ed';
const owBaseUrl = 'http://api.openweathermap.org';

const inputField = document.getElementById('city');
const searchButton = document.getElementById('search-button');
const showTemp = document.getElementById('temperature');
const showWind = document.getElementById('wind');
const showPressure = document.getElementById('pressure');
const showHumidity = document.getElementById('humidity');
const description = document.getElementById('description');
const overlay = document.querySelector('.overlay');
const searchedCity = document.getElementById('show-city');

const searchForWeather = async () => {
    const city = document.getElementById('city').value;
    searchedCity.innerHTML = firstLetterToUpperCase(city);

    const geoObject = await locationToCoordinates(city);
    const lat = geoObject.lat;
    const lon = geoObject.lon;

    const requestEndpoint = '/data/2.5/weather';
    const requestParams = `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;
    const urlToFetch = owBaseUrl + requestEndpoint + requestParams;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const weather = await response.json();
            showTemp.innerHTML = Math.floor(weather.main.temp) + '°';
            showWind.innerHTML = weather.wind.speed + 'km/h';
            showPressure.innerHTML = weather.main.pressure + 'hpa';
            showHumidity.innerHTML = weather.main.humidity + '%';
            description.innerHTML = firstLetterToUpperCase(weather.weather[0].description);
            chooseImage(weather.weather[0].main);
        }
    } catch (error) {
        console.log(error);
    }
}

const locationToCoordinates = async (city) => {
    const requestEndpoint = '/geo/1.0/direct?q=';
    const params = `${city}&limit=1&appid=${apiKey}`;
    const urlToFetch = owBaseUrl + requestEndpoint + params;
    
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const coordinates = await response.json();
            return coordinates[0];
        }
        throw new Error('Request failed!');
    } catch (error) {
        console.log(error);
    }
}

const chooseImage = (description) => {
    if (description === 'Thunderstorm' || description === 'Drizzle' || description === 'Rain') {
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.64)';
    } else {
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.38)';
    }
}

const firstLetterToUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

searchButton.addEventListener('click', () => {
    if (inputField.value !== "")
        searchForWeather();
});

inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && inputField.value !== "") {
        event.preventDefault();
        searchButton.click();
        inputField.value = "";
    }
});
