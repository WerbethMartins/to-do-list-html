export function setupListBox(){
    const taskListBox = document.querySelector('.list-box');

    if(!taskListBox) return;

    taskListBox.innerHTML = '';

    taskListBox.innerHTML = `
        <div class="task-list-item">
            <div class="task-list-title-section">
            <p class="card-title">Python</p>
            </div>
            <div class="task-list-image-and-description-section">
            <img src="./img/task-img/Python.jpg" alt="Imagem linguagem python" class="card-image">
            <p class="card-description">Estudando para aprender a trabalhar com python!</p>
            </div>
            <div class="card-footer">
            <p class="card-date">24/09/2025</p>
            <p class="card-status">Concluído</p>
            </div>
        </div>
    `
}

export function initializeSetupTaskList(){
    setupListBox();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupTaskList();
});