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

// Função para buscar tarefa da API
export async function fetchTasks() {
    const apiUrl = 'http://localhost:8081/api/tarefas';

    try {
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const tasks = await response.json();
        displayTasks(tasks);
    }catch (error){
        console.error('Error fetching tasks:', error);
    }
}

// Função para exibir as tarefas na página
export function displayTasks(tasks){
    const tasksContainer = document.querySelector('.dashboard-task-panel');

    // Limpar o conteúdo atual
    const cardTask = document.querySelectorAll('.card-task');
    cardTask.forEach(task => task.remove());

    // Cria um elemento para cada tarefa
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.classList.add('card', 'card-task');

        if(task.concluida){
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h3 class="card-title">${task.titulo}</h3>
            <p class="card-description">${task.descricao}</p>
            <div class="card-footer">
                <p class="card-date">Criado em: sem data</p>
                <p class="card-status">${task.concluida ? 'Concluída' : 'Em progresso'}</p>
                <button class="card-button" data-task-id="${task.id}">
                    ${task.concluida ? 'Desfazer' : 'Completar'}
                </button>
            </div>               
        `;

        tasksContainer.appendChild(card);

    });
}

export function setupAddTaskButton() {
    const addTaskButton = document.getElementById('addTaskButton');
    const createTaskSection = document.getElementById('create-task');

    if(addTaskButton && createTaskSection){
        $(addTaskButton).on('click', () => {
            $(createTaskSection).toggleClass('hidden visible');
            $(createTaskSection).css('display', 'flex');
        });
    }
}

// Funcção para enviar uma nova tarefa para a API
export async function postTask(taskData){
    const apiUrl = 'http://localhost:8081/api/tarefas';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if(!response.ok){
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const newTask = await response.json();
        console.log('Tarefa adicionada com sucesso: ', newTask)
    }catch (error){
        console.error('Error posting task:', error);
    }
}

// Configura o formulário de criação da tarefa
export function setupTaskForm(){
    const taskForm = document.getElementById('task-form');

    if(taskForm){
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Pega os valores do formulário usando os IDs
            const titulo = document.getElementById('taskTitle').value;
            const descricao = document.getElementById('taskDescription').value;

            if(titulo && descricao){
                const newTaskData = {
                    titulo: titulo,
                    descricao: descricao,
                    concluida: false
                }

                postTask(newTaskData);
                taskForm.reset();
            }
            
        });
    }
}

export function initializeApi() {
    fetchTasks();
    setupAddTaskButton();
    setupTaskForm();
}
