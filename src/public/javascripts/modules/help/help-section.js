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
    const moreButton = document.querySelectorAll('.btn-more');

    if (!questionSection) return;

    questionSection.innerHTML = '';

    cardData.forEach((card) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('cards-section');
        cardDiv.classList.add('help-card');
    
        // Condicional pro botão2 (como antes)
        const button2HTML = card.button2 ? `<button type="button" class="btn btn-more-information">${card.button2}</button>` : '';
    
        cardDiv.innerHTML = `
            <i class="${card.icon} help-page__card-icon"></i>
            <h4 class="help-page__card-title">${card.title}</h4>
            <p class="help-page__card-description">${card.description}</p>
            <div class="help-page__card-button-section">
                <button type="button" class="btn btn-more">${card.button}</button>
                ${button2HTML}
            </div>
        `;

        // Adiciona a segunda descrição se existir
        if (card.description2) {
            const description2 = document.createElement('p');
            description2.classList.add('help-page__card-description', 'card-description2', 'hidden');
            description2.textContent = card.description2;
            
            const div = cardDiv.querySelector('.help-page__card-button-section');
            if (div) {
                cardDiv.insertBefore(description2, div);
            } else {
                cardDiv.appendChild(description2);
            }
        
            // Seta o texto original no btn-more
            const btnMore = cardDiv.querySelector('.btn-more');
            if (btnMore) {
                btnMore.dataset.originalText = card.button;
            }
        }

        questionSection.appendChild(cardDiv);
    });

    // Adiciona evento de clique para os botões "Ver Mais"
    const moreButtons = questionSection.querySelectorAll('.btn-more');
    moreButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.help-card');
            const description2 = card.querySelector('.card-description2');
            if (description2) {
                const isHidden = description2.classList.contains('hidden');
                if (isHidden) {
                    description2.classList.remove('hidden');
                    button.textContent = 'Ver Menos';
                } else {
                    description2.classList.add('hidden');
                    button.textContent = button.dataset.originalText || 'Ver Mais';
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