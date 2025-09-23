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
        setupTaskInformationPanel(tasks);
        setupTaskCompletedPanel(tasks);
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
            <h3 class="card-title">${task.title}</h3>
            <p class="card-description">${task.description}</p>
            <div class="card-footer">
                <p class="card-date">Criado em: sem data</p>
                <p class="card-status">${task.completed ? 'Concluída' : 'Em progresso'}</p>
                <button class="card-button" data-task-id="${task.id}">
                    ${task.completed ? 'Desfazer' : 'Completar'}
                </button>
            </div>               
        `;

        tasksContainer.appendChild(card);

    });
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

        // Atualiza a lista de tarefas após adicionar uma nova
        fetchTasks();
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
            const title = document.getElementById('taskTitle').value;
            const description = document.getElementById('taskDescription').value;

            if(titulo && descricao){
                const newTaskData = {
                    title: title,
                    description: description,
                    completed: false
                }

                postTask(newTaskData);
                taskForm.reset();
            }
            
        });
    }
}

export function initializeApi() {
    fetchTasks();
    setupTaskForm();
}
