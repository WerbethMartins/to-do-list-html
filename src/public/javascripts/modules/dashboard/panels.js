// Função debounce para limitar a frequência de execução de uma função
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

// Função para configurar o botão de adicionar tarefa
export function setupAddTaskButton() {
    const tasksContainer = document.getElementById('tasks');
    const addTaskButton = document.getElementById('addTaskButton');
    const closeForm = document.querySelector('.close-form');
    const createTaskSection = document.getElementById('create-task');

    if(addTaskButton && createTaskSection){
        $(addTaskButton).on('click', () => {
            $(createTaskSection).css('display', 'flex');
            $(tasksContainer).css('display', 'none');
        });
    }
}

export function setupCloseFormAddTask(){
    const tasksContainer = document.getElementById('tasks');
    const closeForm = document.querySelector('.close-form');
    const createTaskSection = document.getElementById('create-task');

    if(closeForm && tasksContainer) {
        $(closeForm).on('click', () => {
            $(tasksContainer).show();
            $(createTaskSection).hide();
        });
    }
}

export function setupCreateTaskPanel() {

    const createTaskPanel = document.querySelector('.create-task-panel');

    if(!createTaskPanel) return;

    createTaskPanel.innerHTML =  '';

    createTaskPanel.innerHTML = `
        <div class="add-task-form-header">
            <h2 class="create-task-title bi bi-clipboard"> Crie uma tarefa</h2>
            <button type=button class="close-form">X</button>
        </div>
        <form action="#" id="task-form" class="task-form">
            <div class="up-side">
                <label for="taskTitle"> Titulo:</label>
                <input type="text" name="taskTitle" id="taskTitle" class="task-input" 
                placeholder="Digite o titulo da tarefa" required>

                <div class="task-status">
                    <label for="task-completed">Status:</label>
                    <p id="task-completed" class="task-status-paragraph">Em andamento</p>
                </div>
            </div>

            <div class="down-side">
                <label for="taskDescription"> Descrição:</label>
                <input type="text" name="taskDescription" id="taskDescription" class="task-input textarea-input" 
                placeholder="Digite a descrição da tarefa" required>

                <div class="task-image">
                    <label for="taskImage">Imagem:</label>
                    <input type="file" id="taskImage" name="taskImage" accept="image/*" class="task-input
                    file-input">
                </div>

                <div class="task-buttons">
                    <button type="submit" id="confirmTaskButton" class="btn task-submit-button">Criar Tarefa</button>
                    <button type="button" id="cancelTaskButton" class="btn task-cancel-button">Cancelar</button>
                </div>
            </div>
            
        </form>
    `
}

// Função para atualizar as estatísticas de tarefas

export function updateTaskStatistics(tasks){
    if(!tasks){
        console.log("Nenhuma tarefa disponível para calcular estatísticas.");
        return {
            completed: 0,
            pending: 0,
            cancelled: 0
        }
    }
    const stats = {
        completed: tasks.filter(task => task.concluida).length,
        pending: tasks.filter(task => !task.concluida).length,
        cancelled: tasks.filter(task => task.cancelada).length || 0
    }

    return stats;
}

export function setupTaskInformationPanel(tasks){
    const stats = updateTaskStatistics(tasks);
    const taskInformationPanel = document.querySelector('.task-information-panel');
    if(!taskInformationPanel) return;

    taskInformationPanel.innerHTML = '';

    taskInformationPanel.innerHTML = `
        <h2 class="information-title bi bi-clipboard">Status</h2>
        <div class="information-card">
            <h3 class="information-card-title">Estatísticas:</h3>
            <div class="stat-item">
                <span class="stat-icon completed">✅</span>
                <span class="stat-label">Concluídas:</span>
                <span class="stat-value" id="completed-count">${stats.completed}</span>
            </div>
            
            <div class="stat-item">
                <span class="stat-icon pending">⏳</span>
                <span class="stat-label">Pendentes:</span>
                <span class="stat-value" id="pending-count">${stats.pending}</span>
            </div>
            
            <div class="stat-item">
                <span class="stat-icon cancelled">❌</span>
                <span class="stat-label">Canceladas:</span>
                <span class="stat-value" id="cancelled-count">${stats.cancelled}</span>
            </div>
        </div>
    `
}

export function setupTaskCompletedPanel(tasks){
    const completedTasks = tasks ? tasks.filter(task => task.completed) : [];
    
    const taskCompletedCard = document.querySelector('.completed-card');
    if(!taskCompletedCard) return;

    taskCompletedCard.innerHTML = '';
    
    // Total de tarefas completadas
    taskCompletedCard.innerHTML = `
        <div class="completed-card">
            <h3 class="completed-card-value">Total: ${completedTasks.length}</h3>
            <div class="completed-tasks-list" id="completed-tasks-list">
                
            </div>
        </div>
    `

    // Lista de tarefas completadas
    completedTasks.forEach(task => {
        const cardElement = document.createElement('div');
        // Cards de tarefas completadas
        cardElement.classList.add('completed-task-item', 'card', 'card-task');
        cardElement.innerHTML = `
            <div class="completed-title-section">
                <p class="completed-task-title">${task.title}</p>
            </div> 

            <div class="completed-task-image-and-description-section">
                <img ${task.image} alt="Imagem linguagem Python" class="completed-task-image">
                <p class="completed-task-description">${task.description}</p>
            </div>

            <div class="completed-task-details">
                <p class="completed-task-date">${task.date}</p>
                <p class="completed-task-completed">Concluída</p>
            </div>
        `

        taskCompletedCard.appendChild(cardElement);
    });
}

export function initializeSetupDashboardPage(){
    setupAddTaskButton();
    setupCreateTaskPanel();
    updateTaskStatistics();
    setupTaskInformationPanel();
    setupTaskCompletedPanel();
    setupCloseFormAddTask();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupDashboardPage();
});