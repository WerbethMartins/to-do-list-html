// Método para configurar a data/hora no painel inicial
export function setupCalendarAndHour() {
    const dayElement = document.getElementById('day');
    const monthYearElement = document.getElementById('month-year');
    const timeElement = document.querySelector('.hour-calendar');
    
    if (!dayElement || !monthYearElement || !timeElement) {
        console.error("Um dos elementos de data/hora não foi encontrado.");
        return;
    }

    // Atualiza o horário a cada minuto
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    });

    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();

    dayElement.textContent = day;
    monthYearElement.textContent = `${month} ${year}`;
}

// Método para configurar as informações do clima no painel inicial
export function updateWeather(data) {
    const panelClimat = document.querySelector('.panel-climat');
    const weatherInfo = document.getElementById('weather-info');
    
    if (!panelClimat || !weatherInfo) {
        return;
    }

    let temperatureLocationDiv = panelClimat.querySelector('.temperature-location');
    if (!temperatureLocationDiv) {
        temperatureLocationDiv = document.createElement('div');
        temperatureLocationDiv.classList.add('temperature-location');
        
        const temperatureSpan = document.createElement('span');
        temperatureSpan.classList.add('temperature');
        
        const locationSpan = document.createElement('span');
        locationSpan.classList.add('location');
        
        temperatureLocationDiv.appendChild(temperatureSpan);
        temperatureLocationDiv.appendChild(locationSpan);
        
        panelClimat.appendChild(temperatureLocationDiv);
    }
    
    // Atualiza o conteúdo dos spans
    const temperatureSpan = temperatureLocationDiv.querySelector('.temperature');
    const locationSpan = temperatureLocationDiv.querySelector('.location');
    
    if (temperatureSpan) temperatureSpan.textContent = data.temperature;
    if (locationSpan) locationSpan.textContent = data.location;
    
    weatherInfo.innerHTML = ''; // Limpa informações anteriores

    createdWeatherItems(data);
}

// Função para criar os itens de clima (umidade e vento)

function createdWeatherItems(data) {
    const items = [
        { name: "Umidade", value: data.humidity, img: "img/weather-icon/humidity.png" },
        { name: "Vento", value: data.wind, img: "img/weather-icon/windy.png" }
    ];

    const weatherInfo = document.getElementById('weather-info');
    if (!weatherInfo) return;

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
    });
}

// Funções para a área de tarefas e conquistas (se precisar)
export function setupTaskCreatedInfo() {
    const tasksCreatedCount = document.querySelector('.tasks-created-count');
    const taskData = { created: "0" };
    if (tasksCreatedCount) {
        tasksCreatedCount.textContent = taskData.created;
    }
    setupMonthMostTask();
}

function setupMonthMostTask() {
    const monthsData = [
        { name: "Janeiro", percentage: 45 },
        { name: "Fevereiro", percentage: 30 },
        { name: "Março", percentage: 10 },
        { name: "Abril", percentage: 60 },
    ];
    const monthsList = document.getElementById('months-list');
    if (!monthsList) return;
    monthsList.innerHTML = '';

    monthsData.forEach(month => {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month-item');

        const monthName = document.createElement('p');
        monthName.classList.add('most-tasks');
        monthName.textContent = month.name;

        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('custom-progress-bar-container');

        const progressBarFill = document.createElement('div');
        progressBarFill.classList.add('custom-progress-bar-fill');
        progressBarFill.style.width = `${month.percentage}%`;

        if (month.percentage <= 10) {
            progressBarFill.style.backgroundColor = '#d41225ff';
        } else {
            progressBarFill.style.backgroundColor = '#4caf50';
        }
        
        progressBarContainer.appendChild(progressBarFill);
        monthDiv.appendChild(monthName);
        monthDiv.appendChild(progressBarContainer);
        monthsList.appendChild(monthDiv);
    });
}

export function setupFavoriteTasks(){
    const favoriteTasks = [
        { title: "Aprender React", description: "Estudar os fundamentos do React e criar um projeto simples." },
        { title: "Exercitar-se", description: "Fazer uma caminhada de 30 minutos no parque." },
        { title: "Ler um livro", description: "Ler pelo menos 20 páginas de um livro interessante." },
        { title: "Cozinhar uma nova receita", description: "Experimentar uma receita diferente para o jantar." },
        { title: "Meditar", description: "Praticar meditação por 10 minutos para relaxar a mente." }
    ];

    const favoriteTaskList = document.querySelector('.favorite-tasks-list');
    if(!favoriteTaskList) return;
    favoriteTaskList.innerHTML = '';

    favoriteTasks.forEach(task => {
        const taskDiv = document.createElement('li');
        taskDiv.classList.add('favorite-task-item', 'favorite-task-card');
        taskDiv.textContent = task.title;

        favoriteTaskList.appendChild(taskDiv);
    });
}

export function setupArchievementsPanel() {
    // Simulação de dados de conquistas
    const archievementsData = [
        { title: "E já foi a primeira!", img: "./img/rewards/gold-medal-locked.png",description: "Parabéns por criar sua primeira tarefa!" },
        { title: "Colecionador de tarefas!", img: "./img/rewards/medal-locked.png", description: "Você concluiu 5 tarefas!" },
        { title: "Mestre da produtividade!", img: "./img/rewards/goal-locked.png", description: "Você concluiu 10 tarefas!" },
        { title: "Furacão de deveres!", img: "./img/rewards/success-locked.png", description: "Você concluiu 15 tarefas!" },
    ]

    const archievementsList = document.querySelector('.achievements-list');
    if (!archievementsList) return;

    archievementsList.innerHTML = '';

    archievementsData.forEach(archievement => {
        const archievementLi = document.createElement('li');
        archievementLi.classList.add('achievement-item');

        const img = document.createElement('img');
        img.src = archievement.img;

        const archievementDiv = document.createElement('div');
        archievementDiv.classList.add('achievement-info');
        
        archievementDiv.innerHTML = `
            <h3 class="archievement-title">${archievement.title}</h3>
            <p class="archievement-description">${archievement.description}</p> 
        `

        archievementsList.appendChild(archievementLi);
        archievementLi.appendChild(img);
        archievementLi.appendChild(archievementDiv);
    });

}

// Função principal de inicialização
export function initializeSetupHomePage() {
    setupCalendarAndHour();
    
    const exampleWeatherData = {
        temperature: "25°C",
        location: "Blumenau, SC",
        humidity: "60%",
        wind: "10km/h"
    };
    
    updateWeather(exampleWeatherData);
    setupTaskCreatedInfo();
    setupFavoriteTasks();
    setupArchievementsPanel()
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupHomePage();
});