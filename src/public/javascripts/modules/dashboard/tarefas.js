import { topics } from './panels.js';

// Função debounce
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

// Busca tarefas
export async function fetchTasks() {
    try {
        const res = await fetch('http://localhost:8081/api/tarefas');
        if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
        
        const tasks = await res.json();
        
        displayTasks(tasks);
        setupTaskInformationPanel(tasks);
        setupTaskCompletedPanel(tasks);
    } catch (err) {
        console.error('Erro fetchTasks:', err);
    }
}

// Função para buscar tarefas da API
export async function postTask(taskData) {
    const apiUrl = 'http://localhost:8081/api/tarefas';

    try {
        console.log('🔗 Enviando para:', apiUrl);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        // Tratamento de erro HTTP
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro HTTP:', response.status, errorText);
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const newTask = await response.json();
        console.log('Tarefa adicionada com sucesso: ', JSON.stringify(newTask, null, 2));  // Log detalhado pra debug

        // Atualiza a lista de tarefas após adicionar uma nova
        await fetchTasks();  // Isso agora atualiza tudo (lista + painéis)

        return newTask;
    } catch (error) {
        console.error('Erro ao enviar tarefa:', error);
        console.log('📤 Dados enviados:', JSON.stringify(taskData, null, 2));
        alert('Falha ao criar a tarefa. Verifique a API e tente novamente.');
    }
}

// Função para atualizar o status 'completed' no backend
async function toggleTaskCompleted(taskId, currentStatus){
    const newStatus = !currentStatus; // Inverte o status atual (true vira false, false vira true)

    try {
        const response = await fetch(`http://localhost:8081/api/tarefas/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // Envia apenas o campo 'completed' atualizado
            body: JSON.stringify({ completed: newStatus }) 
        });

        if (!response.ok) {
            console.error(`Erro ao atualizar status da tarefa ${taskId}. Status:`, response.status);
            alert('Erro ao atualizar o status da tarefa. Tente novamente.');
            return false;
        }

        console.log(`✅ Tarefa ${taskId} atualizada para completed: ${newStatus}`);
        return true; // Sucesso na atualização

    } catch (error) {
        console.error('Erro de rede ao concluir/desfazer tarefa:', error);
        return false;
    }
}

// Função para exibir as tarefas na página (lista principal)
function displayTasks(tasks) {
    const tasksContainer = document.querySelector('.dashboard-task-panel');

    if (!tasksContainer) return;

    // Limpar o conteúdo atual
    const cardTask = document.querySelectorAll('.card-task');
    cardTask.forEach(task => task.remove());

    // 🎯 FILTRAGEM: Exibir apenas tarefas "Em progresso" 🎯
    const tasksInProgress = tasks.filter(task => !task.completed && !task.cancelled);

    // Cria um elemento para cada tarefa
    tasksInProgress.forEach((task) => {
        const card = document.createElement('div');
        card.classList.add('card', 'card-task');

        if (task.completed) {  // Consistente: 'completed'
            card.classList.add('completed');
        }

        const createdAt = task.createdAt ? new Date(task.createdAt).toLocaleDateString('pt-BR') : 'sem data';

        card.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">${task.title || 'Título indefinido'}</h3>
                <button class="more-btn">Ver mais</button>
            </div>
            <div class="task-image-and-description-section">
                <img 
                    src="${task.imageUrl || ''}"   
                    alt="Imagem da tarefa" 
                    class="card-image"
                >
                <p class="task-description">${task.description || 'Descrição indefinida'}</p>
            </div>
            <div class="card-topics">
                <h3 class="card-topics__title">Tópicos:</h3>

                <ul class="topic-list hidden">
                    ${task.topics && task.topics.length > 0
                        ? task.topics.map(topic => `
                            <li class="topic-item">
                                <strong>${topic.title}</strong>
                                <div class="topic-item__description-section">
                                    ${topic.description ? `<p class="topic-description">* ${topic.description}</p>` : ''}
                                </div>
                            </li>
                        `).join('')
                        : '<li class="topic-item no-topics">Nenhum tópico</li>'
                    }
                </ul>

                <div class="description-section__arrows">
                    <i class="bi bi-arrow-left-circle-fill topic-item__arrow hidden"></i>
                    <i class="bi bi-arrow-right-circle-fill topic-item__arrow"></i>
                </div>
            </div>
            <div class="card-footer">
                <div class="status-date-section">
                    <p id="createdDate" class="card-date">Criado em: ${createdAt}</p>
                    <div class="status-container">
                        <p class="status-card-title">Status:</p>
                        <p class="card-status">
                            ${task.completed ? 'Concluída' : 'Em progresso'}
                        </p>
                    </div>
                </div>
                <div class="button-section">
                    <button class="card-button completed-button" data-task-id="${task.id}">
                        ${task.completed ? 'Desfazer' : 'Completar'}
                    </button>
                    <button class="card-button edit-button" data-task-id="${task.id}">
                        ${task.edit ? 'Desfazer' : 'Editar'} 
                    </button>
                    <button class="card-button cancel-button" data-task-id="${task.id}">
                        ${task.cancelled ? 'Desfazer' : 'Cancelar'}
                    </button>
                </div>
            </div>               
        `;

        tasksContainer.appendChild(card);

        const completedButton = card.querySelector('.completed-button');

        if (completedButton) {
            completedButton.addEventListener('click', async () => {
                const taskId = completedButton.dataset.taskId; // Obtém o ID do atributo data-task-id
                const currentTask = tasks.find(t => t.id == taskId); // Encontra a tarefa atual

                if (!currentTask) return;

                // 2. Chama a função de atualização da API
                const success = await toggleTaskCompleted(taskId, currentTask.completed);

                if (success) {
                    await fetchTasks(); 
                }
            });
        }

        // Configuração da visibilidade da seção de tópicos (Ver mais/Ver menos)
        const topicList = card.querySelector('.topic-list');
        const moreBtn = card.querySelector('.more-btn');
        const arrowSection = card.querySelector('.description-section__arrows');

        if(moreBtn && topicList){
            moreBtn.addEventListener('click', () => {
                const isHidden = topicList.classList.contains('hidden');
                moreBtn.textContent = isHidden ? 'Ver menos' : 'Ver mais';
                topicList.classList.toggle('hidden', !isHidden);
                topicList.classList.toggle('visible', isHidden);

                if(topicList.classList.contains('hidden')){
                    arrowSection.classList.add('hidden');
                    arrowSection.classList.remove('visible');
                } else {
                    arrowSection.classList.remove('hidden');
                    arrowSection.classList.add('visible');
                }
            });
        }

        setupTopicNavigation(card);
    });
}


// Upload de imagem local (para o servidor Spring Boot)
async function uploadLocal(imageFile) {
  if (!imageFile){
    console.log("Aviso: Nenhuma imagem selecionada para upload.");
    return null;
  }

  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await fetch('http://localhost:8081/api/tarefas/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
        // Se a resposta HTTP for um erro (ex: 500), retorna null
        console.error('❌ Erro no upload local. Status:', response.status);
        return null; 
    }

    const data = await response.json();
    if (data.url) {
      console.log('✅ Upload local concluído:', data.url);
      return data.url;
    }

    console.error('❌ Erro upload local:', data);
    return null;
  } catch (err) {
    console.error('Erro upload imagem local:', err);
    return null;
  }
}

// Configura formulário
export function setupTaskForm() {
    const taskForm = document.getElementById('task-form');
    if (!taskForm) return;

    taskForm.addEventListener('submit', async e => {
        e.preventDefault();

        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const imageFile = document.getElementById('taskImage').files[0];

        if (!title || !description){
            $('.error_message').show();
        }

        const imageUrl = await uploadLocal(imageFile);

        // 🔥 Verifique o resultado
        console.log("🌐 URL recebida:", imageUrl);

        const newTask = {
            title,
            description,
            imageUrl: imageUrl,
            completed: false,
            topics: topics.map(t => ({ title: t.topic, description: t.description }))
        };
        
        console.log("📤 Enviando para o backend:", newTask);

        await postTask(newTask); // Cria um novo card com os valores inseridos no formulário
        
        taskForm.reset();

        // Valores para a seção de tópicos
        topics.length = 0;
        const topicList = document.getElementById('topicList');
        if (topicList) topicList.innerHTML = '';
    });
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

    let completedCount = 0;
    let cancelledCount = 0;

    tasks.forEach(task => {
        if(task.completed){
            completedCount++;
        }

        if(task.cancelledCount){
            cancelledCount++;
        }
    });

    // Pendentes são todas menos as concluídas E menos as canceladas
    const pendingCount = tasks.length - completedCount - cancelledCount;

    return {
        completed: completedCount,
        pending: pendingCount,
        cancelled: cancelledCount
    };
}

// Configuração da seção de informação de tarefas, tarefas pendentes, tarefas cancelada e etc.
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

// Configuração do painel de tarefas concluidas
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
        const card = document.createElement('div');
        card.classList.add('completed-tasks-list', 'card', 'card-task');
        
        // Data fallback
        const taskDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString('pt-BR') : 'sem data';

        card.innerHTML = `
            <div class="completed-title-section">
                <p class="completed-task-title">${task.title || 'Título indefinido'}</p>
                <button class="btn completed-task-more-btn">Ver mais</button>
            </div> 

            <div class="completed-task-image-and-description-section">
                <img ${task.imageUrl ? `src="${task.imageUrl}"` : ''} alt="Imagem da tarefa" class="completed-task-image">
                <p class="completed-task-description">${task.description || 'Descrição indefinida'}</p>
            </div>

            <div class="completed-task-topics">
                <h3 class="completed-task-title">Tópicos:</h3>
                <ul class="topic-list hidden">
                    ${task.topics && task.topics.length > 0
                        ? task.topics.map(topic => `
                            <li class="topic-item">
                                <strong>${topic.title}</strong>
                                <div class="topic-item__description-section">
                                    ${topic.description ? `<p class="topic-description">* ${topic.description}</p>` : ''}
                                </div>
                            </li>
                        `).join('')
                        : '<li class="topic-item no-topics">Nenhum tópico</li>'
                    }
                </ul>

                <div class="completed-description-section__arrows">
                    <i class="bi bi-arrow-left-circle-fill topic-item__arrow hidden"></i>
                    <i class="bi bi-arrow-right-circle-fill topic-item__arrow"></i>
                </div>
            </div>

            <div class="completed-task-details">
                <p class="completed-task-date">${taskDate}</p>
                <p class="completed-task-completed">Status: <span>Concluída</span></p>
            </div>
        `

        taskCompletedCard.appendChild(card);

        const moreButton = card.querySelector('.completed-task-more-btn');
        const topicList = card.querySelector('.topic-list');
        const arrow = card.querySelector('.completed-description-section__arrows');

        if(moreButton && topicList){
            moreButton.addEventListener('click', () => {
                const isHidden = topicList.classList.contains('hidden');
                moreButton.textContent = isHidden ? 'Ver menos' : 'Ver mais';
                
                topicList.classList.toggle('hidden', !isHidden);
                topicList.classList.toggle('visible', isHidden);

                if(topicList.classList.contains('hidden')){
                    arrowSection.classList.add('hidden');
                    arrowSection.classList.remove('visible');
                } else {
                    arrowSection.classList.add('visible');
                    arrowSection.classList.remove('hidden');
                }
            });
        }

        setupTopicNavigation(card);
    });
}

// Função responsavel pela visibilidáde dos tópicos
function setupTopicNavigation(cardElement){
    const topicItems = cardElement.querySelectorAll('.topic-item');

    if(topicItems.length <= 1){
        return;
    }

    let currentIndex = 0;

    // 1.Inicializa: Esconde todos, exceto o primeiro
    topicItems.forEach((item, index) => {
        setTimeout(() => {
            if (index > 0) {
                item.classList.add('hidden');
                item.classList.add('slideLeft');
            } else {
                // O primeiro item (índice 0) é visível
                item.classList.remove('hidden');
                item.classList.add('slideRight');
            }
        }, 2000); // 2 segundo (2000 ms)
    });     

    function updateVisibility(newIndex) {
        // Garante que o índice esteja dentro dos limites
        if (newIndex >= 0 && newIndex < topicItems.length) {
            // Esconde o atual
            topicItems[currentIndex].classList.add('hidden');
            
            // Atualiza e mostra o novo
            currentIndex = newIndex;
            topicItems[currentIndex].classList.remove('hidden');

            // Lógica para mostrar/esconder as setas
            const leftArrow = cardElement.querySelector('.bi-arrow-left-circle-fill');
            const rightArrow = cardElement.querySelector('.bi-arrow-right-circle-fill');
            
            // Se for o primeiro, esconde a seta esquerda
            if (currentIndex === 0) {
                 leftArrow.classList.add('hidden');
            } else {
                 leftArrow.classList.remove('hidden');
            }

            // Se for o último, esconde a seta direita
            if (currentIndex === topicItems.length - 1) {
                 rightArrow.classList.add('hidden');
            } else {
                 rightArrow.classList.remove('hidden');
            }
        }
    } 

    // Adiciona event listeners nas setas
    cardElement.querySelector('.bi-arrow-right-circle-fill').addEventListener('click', () => {
        updateVisibility(currentIndex + 1);
    });

    cardElement.querySelector('.bi-arrow-left-circle-fill').addEventListener('click', () => {
        updateVisibility(currentIndex - 1);
    });
}

export function initializeApi() {
    fetchTasks(); 
    setupTaskForm();
    setupTaskInformationPanel();
    setupTaskCompletedPanel();
}