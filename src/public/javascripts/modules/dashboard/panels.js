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

export function setupCreateTaskPanel() {

    const createTaskPanel = document.querySelector('.create-task-panel');

    if(!createTaskPanel) return;

    createTaskPanel.innerHTML =  '';

    createTaskPanel.innerHTML = `
        <h2 class="create-task-title bi bi-clipboard"> Crie uma tarefa</h2>
        <form action="#" id="task-form" class="task-form">
            <label for="taskTitle"> Titulo:</label>
            <input type="text" name="taskTitle" id="taskTitle" class="task-input" 
                placeholder="Digite o titulo da tarefa" required>

            <label for="taskDescription"> Descrição:</label>
                <input type="text" name="taskDescription" id="taskDescription" class="task-input" 
                placeholder="Digite a descrição da tarefa" required>

            <div class="task-status">
                <label for="task-completed">Status:</label>
                <p id="task-completed" class="task-status-paragraph">
                </p>
            </div>

            <button type="submit" id="confirmTaskButton" class="btn task-submit-button">Criar Tarefa</button>
            <button type="button" id="cancelTaskButton" class="btn task-cancel-button">Cancelar</button>
        </form>
    `
}

export function setupTaskInformationPanel(){
    const taskInformationPanel = document.querySelector('.task-information-panel');
    if(!taskInformationPanel) return;

    taskInformationPanel.innerHTML = '';

    taskInformationPanel.innerHTML = `
     <h2 class="information-title bi bi-clipboard"> Status</h2>
       <div class="information-card">
            <h3 class="information-card-title">Estatisticas:</h3>
            <p class="information-card-value">Concluidas</p>
            <p class="information-card-value">Pendentes</p>
            <p class="information-card-value">Canceladas</p>
        </div>
    `
}

export function initializeSetupDashboardPage(){
    setupCreateTaskPanel();
    setupTaskInformationPanel();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupDashboardPage();
});