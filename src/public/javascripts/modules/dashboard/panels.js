// Configuração do botão de adicionar tarefa
export function setupAddTaskButton() {
    const tasksContainer = document.getElementById('tasks');
    const addTaskButton = document.getElementById('addTaskButton');
    const createTaskSection = document.getElementById('create-task');

    if (addTaskButton && createTaskSection) {
        $(addTaskButton).on('click', () => {
            $(createTaskSection).css('display', 'flex');
            $(tasksContainer).css('display', 'none');
        });
    }
}

export function setupCloseFormAddTask() {
    const tasksContainer = document.getElementById('tasks');
    const closeForm = document.querySelector('.close-form');
    const createTaskSection = document.getElementById('create-task');

    if (closeForm && tasksContainer) {
        $(closeForm).on('click', () => {
            $(tasksContainer).show();
            $(createTaskSection).hide();
        });
    }
}

export function setupCreateTaskPanel() {
    const createTaskPanel = document.querySelector('.create-task-panel');

    if (!createTaskPanel) return;

    createTaskPanel.innerHTML = '';

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
                    <input type="file" id="taskImage" name="taskImage" accept="image/*" class="task-input file-input">
                </div>

                <div class="task-buttons">
                    <button type="submit" id="confirmTaskButton" class="btn task-submit-button">Criar Tarefa</button>
                    <button type="button" id="cancelTaskButton" class="btn task-cancel-button">Cancelar</button>
                </div>
            </div>
        </form>
    `
}

// Handler pro botão Cancelar (adicionei, usa o close)
export function setupCancelTaskButton() {
    const cancelButton = document.getElementById('cancelTaskButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            const taskForm = document.getElementById('task-form');
            if (taskForm) taskForm.reset();
            setupCloseFormAddTask();  // Reusa o close
        });
    }
}

export function initializeSetupDashboardPage() {
    setupAddTaskButton();
    setupCreateTaskPanel();
    setupCloseFormAddTask();
    setupCancelTaskButton(); 
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupDashboardPage();
});