import { setupTaskForm } from './tarefas.js';

// Array de tópicos compartilhado
export let topics = [];

// Inicializa o painel de criação de tarefas
export function setupCreateTaskPanel() {
    const createTaskPanel = document.querySelector('.create-task-panel');
    if (!createTaskPanel) return;

    createTaskPanel.innerHTML = `
        <div class="add-task-form-header">
            <h2 class="create-task-title bi bi-clipboard">Crie uma tarefa</h2>
            <button type="button" class="close-form">X</button>
        </div>
        <form id="task-form" class="task-form">
            <div class="up-side">
                <label for="taskTitle">Título:</label>
                <input type="text" id="taskTitle" class="task-input" placeholder="Digite o título da tarefa" required>

                <div class="task-status">
                    <label>Status:</label>
                    <p class="task-status-paragraph">Em andamento</p>
                </div>
            </div>

            <div class="down-side">
                <label for="taskDescription">Descrição:</label>
                <input type="text" id="taskDescription" class="task-input textarea-input" placeholder="Digite a descrição" required>

                <div class="task-image">
                    <label for="taskImage">Imagem:</label>
                    <input type="file" id="taskImage" accept="image/*" class="task-input file-input">
                    <p class="notice-form">Aviso: Adicione uma imagem com no máximo de dimensões 750 x 500</p>
                </div>
            </div>

            <div class="topic-section hidden">
                <h2 class="topic-title">Tópicos</h2>
                <article class="topic-selection-section">
                    <div class="topic-selection__topicTitle">
                        <label for="topicTitle">Título do tópico:</label>
                        <input id="topicTitle" class="topic-input topic-title">
                    </div>
                    <div class="topic-selection__topicDescription">
                        <label for="topicDescription">Descrição:</label>
                        <input id="topicDescription" class="topic-input topic-description">
                    </div>
                    <p class="message_error" style="display:none;">Digite um tópico válido!</p>
                    <button type="button" id="topicConfirmButton" class="btn btn-topic-confirm">Adicionar</button>
                </article>
                <div id="topicList" class="topic-list"></div>
            </div>

            <div class="task-buttons">
                <button type="button" id="topicTaskButton" class="btn go-topic-button">Tópicos</button>
                <button type="submit" id="confirmTaskButton" class="btn task-submit-button">Criar Tarefa</button>
                <button type="button" id="cancelTaskButton" class="btn task-cancel-button">Apagar</button>
            </div>
        </form>
    `;

    // Botão para mostrar a seção de tópicos
    const topicTaskButton = document.getElementById('topicTaskButton');
    const topicSection = document.querySelector('.topic-section');

    if (topicTaskButton && topicSection) {
        topicTaskButton.addEventListener('click', () => {
            topicSection.classList.toggle('hidden'); // alterna visibilidade
            topicSection.style.display = topicSection.classList.contains('hidden') ? 'none' : 'flex';
        });
    }

    setupTopicHandlers();
    setupCloseFormAddTask();
    setupCancelTaskButton();

    // Form deve ser configurado **após** estar no DOM
    setupTaskForm();
}

// Botão adicionar tópico
function setupTopicHandlers() {
    const topicButton = document.getElementById('topicConfirmButton');
    const topicInput = document.getElementById('topicTitle');
    const topicDescription = document.getElementById('topicDescription');
    const topicList = document.getElementById('topicList');
    const messageError = document.querySelector('.message_error');

    if (topicButton && topicInput && topicDescription && topicList) {
        topicButton.addEventListener('click', () => {
            const title = topicInput.value.trim();
            const desc = topicDescription.value.trim();

            if (title) {
                topics.push({ topic: title, description: desc });
                topicInput.value = '';
                topicDescription.value = '';
                renderTopics(topicList);
                messageError.style.display = 'none';
            } else {
                messageError.style.display = 'block';
            }
        });
    }
}

// Renderiza lista de tópicos
function renderTopics(topicList) {
    topicList.innerHTML = '';
    topics.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('topic-item');
        div.innerHTML = `
            <div class="topic-header">
                <button type="button" class="remove-topic" data-index="${index}">X</button>
                <strong>${item.topic}</strong>
            </div>
            ${item.description ? `<p>${item.description}</p>` : ''}
        `;
        topicList.appendChild(div);
    });

    topicList.querySelectorAll('.remove-topic').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = btn.dataset.index;
            topics.splice(i, 1);
            renderTopics(topicList);
        });
    });
}

// Botão Cancelar tarefa
export function setupCancelTaskButton() {
    const cancelButton = document.getElementById('cancelTaskButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            const taskForm = document.getElementById('task-form');
            if (taskForm) taskForm.reset();
            topics.length = 0; // mantém a referência
            const topicList = document.getElementById('topicList');
            if (topicList) topicList.innerHTML = '';
        });
    }
}

// Botão fechar form
export function setupCloseFormAddTask() {
    const closeForm = document.querySelector('.close-form');
    const tasksContainer = document.getElementById('tasks');
    const createTaskSection = document.getElementById('create-task');

    if (closeForm && tasksContainer && createTaskSection) {
        closeForm.addEventListener('click', () => {
            $(tasksContainer).show();
            $(createTaskSection).hide();
        });
    }
}

// Botão "Adicionar Tarefa" principal
export function setupAddTaskButton() {
    const addTaskButton = document.getElementById('addTaskButton');
    const tasksContainer = document.getElementById('tasks');
    const createTaskSection = document.getElementById('create-task');

    if (addTaskButton && tasksContainer && createTaskSection) {
        addTaskButton.addEventListener('click', () => {
            createTaskSection.style.display = 'flex';
            tasksContainer.style.display = 'none';
        });
    }
}

// Inicializa dashboard
export function initializeSetupDashboardPage() {
    setupAddTaskButton();
    setupCreateTaskPanel();
    // Não chamar setupTaskForm aqui, já é chamado dentro de setupCreateTaskPanel
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupDashboardPage();
});
