// scripts/main.js

// Função para buscar tarefas da API
async function fetchTasks() {
    const apiUrl = 'http://localhost:8081/api/tarefas'; 

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();
        displayTasks(tasks); 
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
    }
}

// Função para exibir as tarefas na página
function displayTasks(tasks) {
    const tasksContainer = document.querySelector('.tasks');
    
    // Limpa o conteúdo atual
    const cardTask = document.querySelectorAll('.card-task');
    cardTask.forEach(task => task.remove());

    // Cria um elemento para cada tarefa
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.classList.add('card', 'card-task');

        if (task.concluida) {
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

function setupAddTaskButton() {
    const addTaskButton = document.getElementById('addTaskButton');
    const createTaskSection = document.getElementById('create-task');

    if (addTaskButton && createTaskSection) {
        $(addTaskButton).on('click', () => {
            $(createTaskSection).toggleClass('hidden visible');
            $(createTaskSection).css('display', 'flex');
        });
    }
}

// Função para enviar uma nova tarefa para a API
async function postTask(taskData) {
    const apiUrl = 'http://localhost:8081/api/tarefas'; 

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error(`Erro ao adicionar tarefa: ${response.status}`);
        }

        const newTask = await response.json();
        console.log('Tarefa adicionada com sucesso:', newTask);
        
        fetchTasks();

    } catch (error) {
        console.error('Houve um problema ao adicionar a tarefa:', error);
    }
}

// Configura o formulário de criação de tarefa
function setupTaskForm() {
    const taskForm = document.getElementById('task-form');

    if (taskForm) {
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Pega os valores do formulário usando os IDs
            const titulo = document.getElementById('taskTitle').value;
            const descricao = document.getElementById('taskDescription').value;

            // Verifica se os campos estão preenchidos
            if (titulo && descricao) {
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

// Chame as funções de inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    setupAddTaskButton();
    setupTaskForm();
});