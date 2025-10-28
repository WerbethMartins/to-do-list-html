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

let topics = [];
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
            </div>

            <div class="topic-section hidden">
                <div class="topic-title-section">
                    <h2 class="topic-title">Tópicos</h2>
                </div>
                <div class="topic-selection-section">
                    <div class="topic-title-section">
                        <label for="topicTitle">Digite o título:</label>
                        <input id="topicTitle" name="topicTitle" class="topic-input topic-title">
                    </div>
                    <div class="topic-description-section">
                        <label for="topicDescription">Descrição:</label>
                        <input type="text" name="topicDescription" id="topicDescription" class="topic-input topic-description">
                    </div>
                    <button type="button" id="topicConfirmButton" class="btn btn-topic-confirm">Adicionar</button>
                </div>
                <div class="topic-list" id="topicList"></div>
            </div>

            <div class="task-buttons">
                <button type="button" id="topicTaskButton" class="btn go-topic-button">Tópicos</button>
                <button type="submit" id="confirmTaskButton" class="btn task-submit-button hidden">Criar Tarefa</button>
                <button type="button" id="cancelTaskButton" class="btn task-cancel-button hidden">Apagar</button>
            </div>
        </form>
    `

    // Handler pro botão de adicionar tópicos
    const upSide = document.querySelector('.up-side');
    const downSide = document.querySelector('.down-side');
    const topicButton = document.getElementById('topicConfirmButton');
    const confirmTaskButton = document.getElementById('confirmTaskButton');
    const cancelTaskButton = document.getElementById('cancelTaskButton');
    const topicInput = document.getElementById('topicTitle');
    const topicDescription = document.getElementById('topicDescription');
    const topicList = document.getElementById('topicList');

    const goTopicButton = document.getElementById('topicTaskButton');
    const topicSection = document.querySelector('.topic-section');
    goTopicButton.addEventListener('click', () => {
        if(topicSection.classList.contains('hidden')){
            upSide.classList.add('hidden');
            downSide.classList.add('hidden');
            goTopicButton.textContent = 'Voltar';
            topicSection.classList.remove('hidden');
            topicSection.classList.add('active');
            confirmTaskButton.classList.remove('hidden');
            confirmTaskButton.classList.add('active');
            cancelTaskButton.classList.remove('hidden');
            cancelTaskButton.classList.add('active');
        } else {
            upSide.classList.remove('hidden');
            downSide.classList.remove('hidden');
            goTopicButton.textContent = 'Tópicos';
            topicSection.classList.add('hidden');
            topicSection.classList.remove('active');
            confirmTaskButton.classList.add('hidden');
            confirmTaskButton.classList.remove('active');
            cancelTaskButton.classList.add('hidden');
            cancelTaskButton.classList.remove('active');
        }
    });

    if (topicButton && topicInput && topicDescription && topicList) {
        topicButton.addEventListener('click', () => {
            const topicValue = topicInput.value.trim();
            const topicDescriptionValue = topicDescription.value.trim();
            if (topicValue) {
                // Adiciona objeto com topic e description 
                topics.push({
                    topic: topicValue,
                    description: topicDescriptionValue || '' // Fallback se vazio
                });
                topicInput.value = ''; // Limpa o input
                topicDescription.value = ''; // Limpa a descrição
                renderTopics(topicList); // Renderiza a lista
                console.log('DEBUG: Tópicos atuais: ', topics);
            } else {
                alert('Digite um tópico válido!');
            }
        });
    }

    const cancelButton = document.getElementById('topicCancleButton');
    if(cancelButton){
        cancelButton.addEventListener('click', () => {
            topics = []; // Reseta tópicos
            renderTopics(topicList); // Limpa a lista
            document.getElementById('task-form').reset();
        });
    }
}

// Função pra renderizar tópicos
function renderTopics(topicList) {
    topicList.innerHTML = ''; // Limpa antes
    
    topics.forEach((item, index) => {
        const topicItem = document.createElement('div');
        topicItem.classList.add('topic-item');
        topicItem.innerHTML = `
            <div class="topic-header">
                <button type="button" class="remove-topic" data-index="${index}">X</button>
                <span>${item.topic}</span>
            </div>
            ${item.description ? `<p class="topic-description">${item.description}</p>` : ''}
        `;
        topicList.appendChild(topicItem);
    });

    // Handlers pra remover tópicos
    topicList.querySelectorAll('.remove-topic').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            topics.splice(index, 1); // Remove o tópico
            renderTopics(topicList); // Re-renderiza
            console.log('DEBUG: Tópico removido, lista atual:', topics);
        });
    });
}

// Handler pro botão Cancelar (adicionei, usa o close)
export function setupCancelTaskButton() {
    const cancelButton = document.getElementById('cancelTaskButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            const taskForm = document.getElementById('task-form');
            if (taskForm) taskForm.reset();
            setupCloseFormAddTask();  // Reúsa o close
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