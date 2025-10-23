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

export function setupCreateTaskTutorialSection(){
    const stepData = [
        {
            step: "Primeiro Passo:",
            title: "Acesse o Painel de Tarefas",
            paragraph: "No menu principal, clique em 'Dashboard' ou no ícone de tarefas . Você verá a lista de tarefas e o botão 'Adicionar'.",
            details: "Certifique-se de estar logado. Nossa API usa tokens JWT para autenticação, então seu login é validado automaticamente. Se não vir o dashboard, cheque sua conexão ou reautentique em <a href='/login'>Login</a>.",
            image: "./img/help-page/dashboard-icone.png",
            button: "Mais detalhes"
        },
        {
            step: "Segundo Passo:",
            title: "Clique em 'Adicionar Tarefa'",
            paragraph: "No menu principal, clique em 'Dashboard' ou no ícone de tarefas . Você verá a lista de tarefas e o botão 'Adicionar'.",
            details: "Clique no botão <strong>'Adicionar Tarefa'</strong> (geralmente um ícone de + ou o texto 'Nova Tarefa'). Isso abrirá o formulário de criação.",
            image: "./img/help-page/add-task-img.png",
            button: "Mais detalhes"
        },
        {
            step: "Terceiro Passo:",
            title: "Preencha o Formulário",
            paragraph: "No formulário, insira o <strong>título</strong> (ex: 'Reunião com equipe'), a <strong>descrição</strong> (detalhes da tarefa), e opcionalmente uma <strong>imagem</strong>. O status padrão é 'Em andamento'.",
            details: "Exemplo: Título: 'Estudo de Spring', Descrição: 'Revisar anotações do curso de Spring Security'. Imagens devem ser em formatos .jpg ou .png (máx. 2MB). A API valida os campos e retorna erro se estiverem vazios.",
            image: "./img/help-page/add-task-img.png",
            button: "Mais detalhes"
        },
        {
            step: "Quarto passo:",
            title: "Salve e Veja Sua Tarefa",
            paragraph: "Clique em 'Criar Tarefa'. A tarefa será enviada à nossa API e aparecerá na lista do dashboard. Você pode editá-la ou marcá-la como concluída depois.",
            details: "A API usa HTTPS e JWT para garantir segurança. Após salvar, a tarefa é retornada com um ID único e aparece no dashboard. Erro? Verifique se o título tem pelo menos 3 caracteres e a descrição 5 (regras da API).",
            image: "./img/help-page/save-task.png",
            button: "Mais detalhes"
        }
    ]

    const stepsSection = document.getElementById('stepsSection');
    const stepImage = document.querySelector('step-image');

    if(!stepsSection) return;

    stepsSection.innerHTML = '';

    stepData.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('step');
        stepDiv.setAttribute('data-step-index', index);

        // Criando steps
        stepDiv.innerHTML = `
            <div class="step">
            <div class="step-header">
                <span class="step-number">${step.step}</span>
                <h4 class="step-title">${step.title}</h4>
            </div>
                <p class="step-description text-color">${step.paragraph}</p>
                <img src="${step.image}" alt="Dashboard de Tarefas" id="stepImage" class="step-image hidden">
            <div class="step-details hidden">
                <p class="text-color">Certifique-se de estar logado. Nossa API usa tokens JWT para autenticação, então seu login é validado automaticamente. Se não vir o dashboard, cheque sua conexão ou reautentique em <a href="/login">Login</a>.</p>
            </div>
            <button type="button" class="btn btn-details" data-original-text="Mais Detalhes" data-step-index=${index}>${step.button}</button>
        </div>
        `
        stepsSection.appendChild(stepDiv);
    });

    const moreDetailsButtons = stepsSection.querySelectorAll('.btn-details');
    moreDetailsButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const step = button.closest('.step');
            const stepImage = step.querySelector('.step-image, .step-image-add-task, .step-image-save-task');
            const moreDetails = step.querySelector('.step-details');
            const stepIndex = parseInt(button.getAttribute('data-step-index'));
            console.log('Clicado', stepIndex);

            if (stepImage) {
                if (stepIndex === 1) {
                    stepImage.classList.remove('step-image')
                    stepImage.classList.add('step-image-add-task');
                } else if (stepIndex === 3) {
                    stepImage.classList.remove('step-image')
                    stepImage.classList.add('step-image-save-task');
                }

                // Oculta/mostra com toggle suave
                stepImage.classList.toggle('hidden');
            }

            if (moreDetails) {
                const isHidden = moreDetails.classList.contains('hidden');
                moreDetails.classList.toggle('hidden', !isHidden);
                button.textContent = isHidden ? 'Ver Menos' : 'Mais Detalhes';
            }
        });
    });
    
}

export function initializeHelpSection() {
    setupQuestionHelpSection();
    setupHelpTitleAndSuport();
    setupHelpCardSection();
    setupSendQuestionForm();

    setupSecurityAndProtectionSection();

    setupCreateTaskTutorialSection();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeHelpSection();
});