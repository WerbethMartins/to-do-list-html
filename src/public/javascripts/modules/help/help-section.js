export function setupHelpTitleAndSuport(){
    const titleSection = document.querySelector('.help-title-and-suppport-callout');

    if(!titleSection) return;

    titleSection.innerHTML = `
        <h2 class="help-page__title">Precisa de assistência?</h2>
        <h4 class="title-color">Se você está se sentindo sobrecarregado, lembre-se... Você não está sozinho(a)!</h4>
        <h3 class="title-color">Procure a ajuda de que você precisa!</h3>
    `
}

export function setupQuestionHelpSection() {
    const questionSection = document.querySelector('.help-page__question-section');

    if(!questionSection) return;

    questionSection.innerHTML = `
        <input type="text" class="help-page__question-input" placeholder="Como podemos ajudar?"/>
        <button type="button" class="btn btn-question"><i class="bi bi-search"></i> Pesquisar</button>
    `
}

export function setupHelpCardSection() {
        const cardData = [
        { 
            icon: "bi bi-envelope-arrow-up", 
            title: "Envie-nos uma pergunta", 
            description: "Nossa equipe está pronta para te ajudar! Envie sua pergunta e entraremos em contato o quanto antes.", 
            button: "Enviar Pergunta"
        },
        {
            icon: "bi bi-shield-check", 
            title: "Segurança e Proteção", 
            description: "Mantemos suas informações protegidas com criptografia e práticas de segurança atualizadas.",
            description2: "Aqui você pode saber mais sobre como cuidamos dos seus dados e garantir uma experiência segura.",
            button: "Ver Mais",
            button2: "Informações de Segurança"
        },
        {
            icon: "bi bi-clipboard2-check", 
            title: "Criar tarefas", 
            description: "Precisa de ajuda para adicionar ou gerenciar suas tarefas? Vamos te ajudar com isso.", 
            description2: "Clique no botão abaixo para ver as instruções detalhadas sobre como criar e organizar suas tarefas de forma eficiente.",
            button: "Ver Mais",
            button2: "Instruções de Tarefas"
        }
    ];

    const questionSection = document.querySelector('.help-page__cards-section');
    const questionForm = document.getElementById('questionForm');

    if (!questionSection) return;

    questionSection.innerHTML = '';

    cardData.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('cards-section');
        cardDiv.classList.add('help-card');
        cardDiv.setAttribute('data-card-index', index);
    
        // Condicional pro botão2
        const button2HTML = card.button2 ? `<button type="button" class="btn btn-more-information">${card.button2}</button>` : '';
        const description2HTML = card.description2 
            ? `<p class="help-page__card-description card-description2 hidden">${card.description2}</p>` 
            : '';
        
        cardDiv.innerHTML = `
            <i class="${card.icon} help-page__card-icon"></i>
            <h4 class="help-page__card-title">${card.title}</h4>
            <p class="help-page__card-description">${card.description}</p>
            ${description2HTML}
            <div class="help-page__card-button-section">
                <button type="button" class="btn btn-more" data-button="${card.button.toLowerCase().replace(/\s/g, '-')}" data-card-index="${index}">${card.button}</button>
                ${button2HTML}
            </div>
        `;

        
        questionSection.appendChild(cardDiv);
    });

    // Adiciona evento de clique para os botões "Ver Mais"
    const moreButtons = questionSection.querySelectorAll('.btn-more');
    moreButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const cardIndex = parseInt(button.getAttribute('data-card-index'));

            if(cardIndex === 0){
                if(questionForm){
                    questionForm.classList.remove('hidden');

                    questionForm.scrollIntoView({behavior: 'smooth'});

                }
            }else {
                const card = button.closest('.help-card');
                const description2 = card.querySelector('.card-description2');
                if (description2) {
                    const isHidden = description2.classList.contains('hidden');
                    if (isHidden) {
                        description2.classList.remove('hidden');
                        button.textContent = 'Ver Menos';
                    } else {
                        description2.classList.add('hidden');
                        // Use o texto original do cardData, ou defina um data-original-text se não for 'Ver Mais'
                        // Como você está recriando tudo, podemos usar o valor fixo 'Ver Mais' se a lógica for essa.
                        button.textContent = 'Ver Mais'; 
                    }
                }
            }
        });
    }); 
}



export function initializeHelpSection() {
    setupQuestionHelpSection();
    setupHelpTitleAndSuport();
    setupHelpCardSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeHelpSection();
});