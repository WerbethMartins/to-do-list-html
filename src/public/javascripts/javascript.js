// Função para buscar tarefas da API
async function fetchTasks(){
    const apiUrl = 'http://localhost:8081/api/tarefas'; 

    try {
      const response = await fetch(apiUrl);
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }  
      const tasks = await response.json();
      displayTasks(tasks); // Chama a função para exibir as tarefas
    }catch (error){
        console.log("Erro ao buscar tarefas:", error);
    }
}

// Função para exibir as tarefas na página
function displayTasks(tasks){
    const tasksContainer = document.querySelector('.tasks');

    // Limpa o conteúdo atual
    const cardTask = document.querySelectorAll('.card-task');
    cardTask.forEach(task => task.remove());

    // Cria um elemento para cada tarefa
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.classList.add('card','card-task');

        card.innerHTML = `
            <h3 class="card-title">${task.title}</h3>
            <p class="card-description">${task.description}</p>
            <div class="card-footer">
            <div class="card-footer">
                <p class="card-date">Criado em: ${new Date(task.createdAt).toLocaleDateString()}</p> // Formata a data
                <button class="card-button">Completar</button>
            </div>
        `;

        tasksContainer.appendChild(card);
    });
}

// Chama a função principal quando a página for carregada
document.addEventListener('DOMContentLoaded', fetchTasks)

function addTask() {
    const addTaskButton = document.getElementById('addTaskList');

    if(addTaskButton){
        addTaskButton.addEventListener('click', () => {
            
        });
    }
}