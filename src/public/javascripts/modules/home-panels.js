
// Calendário
export function setupCalendar(){
    const dayElement = $('#day');
    const monthYearElement = $('#month-year');

    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();

    dayElement.text(day);
    monthYearElement.text(`${month} ${year}`);
}

export function setupWeatherInfo(){
    const weatherInfo = $('#weather-info');
    const temperatureElement = $('.temperature');
    const locationElement = $('.location');

    // Simulando dados de clima
    const weatherData = {
        temperature: "25°C",
        location: "Blumenau, SC",
        humidity: "60%",
        wind: "10km/h"
    };

    temperatureElement.text(weatherData.temperature);
    locationElement.text(weatherData.location);

    createdWeatherItems(weatherData);

}

function createdWeatherItems(data){
    const items = [
        { name: "Umidade", value: data.humidity, img: "img/humidity.png" },
        { name: "Vento", value: data.wind, img: "img/windy.png" }
    ];

    const weatherInfo = document.getElementById('weather-info');

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('weather-item');

        const img = document.createElement('img');
        img.classList.add('weather-item-img');
        img.src = item.img;
        img.alt = item.name;


        const infoDiv = document.createElement('div');
        infoDiv.classList.add('weather-item-info');
        infoDiv.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-value">${item.value}</span>
        `;

        itemDiv.appendChild(img);
        itemDiv.appendChild(infoDiv);
    
        weatherInfo.appendChild(itemDiv);
    })
}

export function setupTaskCreatedInfo(){
    const tasksCreatedCount = $('.tasks-created-count');

    const taskData = {
        created: "0"
    };

    tasksCreatedCount.text(taskData.created);

    setupMonthMostTask();
}

function setupMonthMostTask(){

    // Dados dos meses e suas porcentagens
    const monthsData = [
        { name: "Janeiro", percentage: 45 },
        { name: "Fevereiro", percentage: 30 },
        { name: "Março", percentage: 10 },
        { name: "Abril", percentage: 60 },
    ];

    const monthsList = document.getElementById('months-list');

    monthsData.forEach(month => {

    // Cria o contêiner de cada mês
    const monthDiv = document.createElement('div');
    monthDiv.classList.add('month-item'); // Classe genérica

    const monthName = document.createElement('p');
    monthName.classList.add('most-tasks');
    monthName.textContent = month.name;

    
    const progressBarContainer = document.createElement('div');
    progressBarContainer.classList.add('custom-progress-bar-container');

    const progressBarFill = document.createElement('div');
    progressBarFill.classList.add('custom-progress-bar-fill');
    progressBarFill.style.width = `${month.percentage}%`;

    if(month.percentage <= 10){
        progressBarFill.style.backgroundColor = '#d41225ff';
    } else {
        progressBarFill.style.backgroundColor = '#4caf50';
    }
    
    // Monta a estrutura
    progressBarContainer.appendChild(progressBarFill);
    monthDiv.appendChild(monthName);
    monthDiv.appendChild(progressBarContainer);

    // Adiciona o mês completo ao contêiner principal
    monthsList.appendChild(monthDiv);
    });
}

export function initializeSetupHomePage(){
    setupCalendar();
    setupWeatherInfo();
    setupTaskCreatedInfo();
}
