// Função debounce (deixa aqui, remove do outro arquivo)
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

// Função para buscar tarefas da API
export async function fetchTasks() {
    const apiUrl = 'http://localhost:8081/api/tarefas';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const tasks = await response.json();
        displayTasks(tasks);
        // Integração: Atualiza painéis de stats e completadas com os dados
        setupTaskInformationPanel(tasks);
        setupTaskCompletedPanel(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Função para exibir as tarefas na página (lista principal)
function displayTasks(tasks) {
    const tasksContainer = document.querySelector('.dashboard-task-panel');

    if (!tasksContainer) return;

    // Limpar o conteúdo atual
    const cardTask = document.querySelectorAll('.card-task');
    cardTask.forEach(task => task.remove());

    // Cria um elemento para cada tarefa
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.classList.add('card', 'card-task');

        if (task.completed) {  // Consistente: 'completed'
            card.classList.add('completed');
        }

        const createdDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString('pt-BR') : 'sem data';

        card.innerHTML = `
            <h3 class="card-title">${task.title || 'Título indefinido'}</h3>
            <p class="card-description">${task.description || 'Descrição indefinida'}</p>
            <div class="card-footer">
                <p class="card-date">Criado em: ${createdDate}</p>
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
export async function postTask(taskData) {
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
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const newTask = await response.json();
        console.log('Tarefa adicionada com sucesso: ', JSON.stringify(newTask, null, 2));  // Log detalhado pra debug

        // Atualiza a lista de tarefas após adicionar uma nova
        fetchTasks();  // Isso agora atualiza tudo (lista + painéis)
    } catch (error) {
        console.error('Error posting task:', error);
    }
}

// Configura o formulário de criação da tarefa
export function setupTaskForm() {
    const taskForm = document.getElementById('task-form');

    if (taskForm) {
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Pega os valores do formulário usando os IDs
            const title = document.getElementById('taskTitle').value.trim();
            const description = document.getElementById('taskDescription').value.trim();

            if (title && description) {
                const newTaskData = {
                    title: title,
                    description: description,
                    completed: false  
                }

                postTask(newTaskData);
            } else {
                alert('Preencha título e descrição!');
            }
            
            taskForm.reset(); 
        });
    }
}

// Exporta as funções de stats/completadas do segundo arquivo Panel
export function updateTaskStatistics(tasks) {
    if (!tasks) {
        console.log("Nenhuma tarefa disponível para calcular estatísticas.");
        return {
            completed: 0,
            pending: 0,
            cancelled: 0
        }
    }
    const stats = {
        completed: tasks.filter(task => task.completed).length, 
        pending: tasks.filter(task => !task.completed).length,
        cancelled: tasks.filter(task => task.cancelled).length || 0
    }

    return stats;
}

export function setupTaskInformationPanel(tasks) {
    const stats = updateTaskStatistics(tasks);
    const taskInformationPanel = document.querySelector('.task-information-panel');
    if (!taskInformationPanel) return;

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

export function setupTaskCompletedPanel(tasks) {
    const completedTasks = tasks ? tasks.filter(task => task.completed) : [];
    
    const taskCompletedCard = document.querySelector('.completed-card');
    if (!taskCompletedCard) return;

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
        cardElement.classList.add('completed-task-item', 'card', 'card-task');
        
        // Data fallback
        const taskDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString('pt-BR') : 'sem data';

        cardElement.innerHTML = `
            <div class="completed-title-section">
                <p class="completed-task-title">${task.title || 'Título indefinido'}</p>
            </div> 

            <div class="completed-task-image-and-description-section">
                <img ${task.image ? `src="${task.image}"` : ''} alt="Imagem da tarefa" class="completed-task-image">
                <p class="completed-task-description">${task.description || 'Descrição indefinida'}</p>
            </div>

            <div class="completed-task-details">
                <p class="completed-task-date">${taskDate}</p>
                <p class="completed-task-completed">Concluída</p>
            </div>
        `

        taskCompletedCard.appendChild(cardElement);
    });
}

export function initializeApi() {
    fetchTasks(); 
    setupTaskForm();
}