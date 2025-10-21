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
    const securityInfoSection = document.getElementById('securityInfoSection');

    if (!questionSection) return;

    questionSection.innerHTML = '';

    cardData.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('cards-section');
        cardDiv.classList.add('help-card');
        cardDiv.setAttribute('data-card-index', index);
    
        // Condicional pro botão2
        const button2HTML = card.button2 ? `<button type="button" class="btn btn-more-information" data-card-index="${index}">${card.button2}</button>` : '';
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

                    // Rola suavemente até o formulário de perguntas
                    questionForm.scrollIntoView({behavior: 'smooth'});

                    // Se a sessão de segurança estiver aberta, fecha ela
                    if(securityInfoSection && !securityInfoSection.classList.contains('hidden')){
                        securityInfoSection.classList.add('hidden');
                    }

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

    // Adiciona evento de clique para os botões "Informações de Segurança" e "Instruções de Tarefas"]
    const moreInfoButtons = questionSection.querySelectorAll('.btn-more-information');
    moreInfoButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const cardIndex = parseInt(button.getAttribute('data-card-index'));
            console.log('clicado',cardIndex);
            if(cardIndex === 1){
                if(securityInfoSection){
                    securityInfoSection.classList.remove('hidden');

                    // Rola suavemente até a seção de informação de segurança
                    securityInfoSection.scrollIntoView({behavior: 'smooth'});

                    if(questionForm && !questionForm.classList.contains('hidden')){
                        questionForm.classList.add('hidden');
                    }
                }
            }else if(cardIndex === 2){
                window.location.href = '/help/task-instructions';
            }
        });
    });
}

export function setupSendQuestionForm(){
    const questionForm = document.getElementById('questionForm');

    if(!questionForm) return;

    questionForm.innerHTML = `
        <div class="question-form-page__header">
            <h2 class="question-form-page__title title-color">Preencha o formulário</h2>
            <p class="question-form-page__description text-color">
              Conte-nos sobre sua dúvida ou problema, nossa equipe responderá o mais breve possível. 
              Todas as mensagens são confidenciais e protegidas!
            </p>
        </div>

        <form action="" class="question-form-page__contact-form">
            <label for="name" class="form-label">Nome Completo:</label>
            <input type="text" class="form-input form__name" name="name" required>
            <label for="email" class="form-label">E-mail:</label>
            <input type="text" class="form-input form__email" name="email" required>
            <label for="subject" class="form-label">Assunto:</label>
            <input type="text" class="form-input form__name" name="subject" required>
            <textarea id="message" name="message" class="form-input form-textarea" rows="5" 
            placeholder="Descreva sua dúvida ou problema em detalhes..." required></textarea>
            <button type="submit" class="btn btn-submit">Enviar Mensagem</button>
        </form>
    `
}

export function setupSecurityAndProtectionSection(){
    const securityInfoSection = document.getElementById('securityInfoSection');

    if(!securityInfoSection) return;

    securityInfoSection.innerHTML = `
        <div class="security-page__title-and-paragraph">
            <h2 class="security-page__title title-color">Segurança e Proteção</h2>
            <p class="security-page__paragraph">
                Sua segurança é nossa prioridade! Nossa aplicação utiliza Spring Security no backend 
                (desenvolvido com Java e Spring Boot) para garantir autenticação e autorização robustas. 
                Isso significa que todos os logins e registros são protegidos contra acessos não autorizados, 
                com criptografia de senhas (usando BCrypt) e tokens JWT para sessões seguras.
            </p>
        </div>

        <div class="security-page__tips-section">
            <h3 class="security-page__tips-title title-color">Dicas para manter sua conta segura:</h3>
            <ul class="security-page__tips-list">
              <li class="security-page__tip-item"><i class="bi bi-check-circle tip-icon"></i> Use senhas fortes e únicas para sua conta.</li>
              <li class="security-page__tip-item"><i class="bi bi-shield-lock tip-icon"></i> Ative a autenticação de dois fatores (2FA) se disponível.</li>
              <li class="security-page__tip-item"><i class="bi bi-ban tip-icon"></i> Nunca compartilhe suas credenciais de login com ninguém.</li>
              <li class="security-page__tip-item"><i class="bi bi-cloud-download tip-icon"></i> Mantenha seu software e navegador atualizados.</li>
              <li class="security-page__tip-item"><i class="bi bi-eye-slash tip-icon"></i> Fique atento a atividades suspeitas em sua conta.</li>
            </ul>
        </div>

        <div class="security-page__howWork-section">
            <h3 class="security-page__howWork-title title-color">Como funciona a segurança:</h3>
            <ul>
              <li class="howWork-page__list-item">
                <strong>Registro de usuário:</strong> Ao se registrar, sua senha é hashada automaticamente 
                com BCrypt antes de ser salva no banco. Isso garante que, mesmo em caso de breach, 
                as senhas não sejam legíveis.
              </li>
              <li class="howWork-page__list-item">
                <strong>Login Seguro:</strong> No login, Spring Security valida as credenciais. 
                Se correto, um token JWT é gerado e enviado. Use esse token em requisições futuras para 
                autenticação sem senha a cada chamada.
              </li>
              <li class="howWork-page__list-item">
                <strong>Tokens JWT:</strong> Utilizamos JSON Web Tokens (JWT) para gerenciar sessões de usuário, 
                proporcionando uma experiência segura e sem complicações.
              </li>
              <li class="howWork-page__list-item">
                <strong>Proteção contra Ataques:</strong> CSRF, XSS e SQL Injection são mitigados por filtros 
                do Spring Security. Todas as APIs usam CORS configurado para o seu domínio. 
              </li>
            </ul>
        </div>  
    `
}

export function initializeHelpSection() {
    setupQuestionHelpSection();
    setupHelpTitleAndSuport();
    setupHelpCardSection();
    setupSendQuestionForm();
    setupSecurityAndProtectionSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeHelpSection();
});