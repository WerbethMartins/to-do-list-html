export function debounce(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export async function fetchWeather() {
    const apiUrl = 'https://weather-api167.p.rapidapi.com/api/weather/forecast?place=London%2CGB&cnt=3&units=standard&type=three_hour&mode=json&lang=en';

    try{
        const response = await fetch(apiUrl)
        if(!response.ok){
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const weatherData = await response.json();
        console.log(weatherData);
    }catch (error){ 
        console.error("Error fetching weather data:", error);
    }
}

export function displayWeatherInfo(weatherData){
    const weatherDiv = document.querySelector('.temperature-location');

    // Limpar o conteúdo atual
    const temperatureElement = document.querySelector('.temperature');
    const locationElement = document.querySelector('.location');
    

    weatherData.forEach(weatherData => {
        console.log(weatherData);
        const div = document.createElement('div');
        div.classList.add('temperature-location');
        div.innerHTML = `
            <p class="temperature>${weatherData.temperature}
            <p class="location>${weatherData.location}
            `;

        temperatureElement.text(weatherData.temperature);
        locationElement.text(weatherData.location);
        
        weatherDiv.appendChild(div);
    });
    
}

export function initializeApiWeather(){
    fetchWeather();
    displayWeatherInfo();
}
