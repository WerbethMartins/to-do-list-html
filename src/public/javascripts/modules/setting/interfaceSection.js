// Sessão de configuração de interface
export function setupCustomizeProfileImg(){
    const customizeProfileImage = document.getElementById('customize-profile-img');

    if(!customizeProfileImage) return;

    customizeProfileImage.innerHTML = `
        <div class="interface-page_texts">
            <h4 class="title-color">Foto de perfil</h4>
            <p>Customize ação da foto de perfil do menu principal</p>
            <p class="alert-message">Selecione uma opção primeiro!</p>
        </div>
        <div class="actions-demonstration">
            <img 
                class="interface-page__img demonstration-img-1 square-shadow" 
                data-action="scale"
                src="./img/profile-img/profile-icon-design-free-vector.jpg" 
                alt="Primeira imagem de demonstração"
            >
            <img 
                class="interface-page__img demonstration-img-2 square-shadow" 
                data-action="translate"
                src="./img/profile-img/profile-icon-design-free-vector.jpg" 
                alt="Segunda imagem de demonstração"
            >
            <img 
                class="interface-page__img demonstration-img-3 square-shadow"
                data-action="rotate" 
                src="./img/profile-img/profile-icon-design-free-vector.jpg" 
                alt="Terceira imagem de demonstração"
            >
        </div>
    `;
}

export function setupProfileImageActions(){
    const demoImages = document.querySelectorAll('.actions-demonstration .interface-page__img');
    const saveButton = document.getElementById('save-action');
    const mainProfileImg = document.getElementById('mainProfileImg');
    const alertMessage = document.querySelector('.alert-message');

    if(!demoImages.length || !mainProfileImg) return;

    demoImages.forEach(img => {
        img.addEventListener('click', () => {
            console.log('Imagem clicada!');
            // Remove seleção anterior
            demoImages.forEach(i => i.classList.remove('active'));

            // Marca a nova 
            img.classList.add('active');

        });
    });

    if(saveButton){
        saveButton.addEventListener('click', () => {
            const activeImg = document.querySelector('.actions-demonstration .interface-page__img.active');
            if(!activeImg){
                alertMessage.show();
                return;
            }

            const action = activeImg.dataset.action;
            localStorage.setItem('profileImgAction', action);
            console.log(`Configuração salva: ${action}. Recarregando...`);
            location.reload();
        });
    }

    // Reaplica a ação salva
    const savedAction = localStorage.getItem('profileImgAction') || 'scale';
    applyProfileImgAction(mainProfileImg, savedAction);
    const activeDemo = document.querySelector(`[data-action="${savedAction}"]`);
    if (activeDemo) activeDemo.classList.add('active');
}

function applyProfileImgAction(element, action) {
    if(!element) return;

    // Evita duplicar listeners
    if(element.dataset.listenerApplied){
        element.dataset.appliedAction = action;
        return;
    }

    element.dataset.listenerApplied = 'true';
    element.dataset.appliedAction = action;
    element.dataset.transition = 'transform 0.4s ease';

    const handleMouseEnter = () => {
        const currentAction = element.dataset.appliedAction;
        switch (action) {
            case 'scale':
                element.style.transform = 'scale(1.1)';
                break;
            case 'translate': 
                element.style.transform = 'translateY(-5px)';
                break;
            case 'rotate':
                element.style.transform = 'rotateY(180deg)';
                break;
            default:
                element.style.transform = 'none';
        }
    };

    const handleMouseLeave = () => {
        element.style.transform = 'none';
    };
    
    // Remove listeners antigos se existirem
    const oldEnter = element._oldEnter;
    const oldLeave = element._oldLeave;
    if(oldEnter) element.removeEventListener('mouseenter', oldEnter);
    if(oldLeave) element.removeEventListener('mouseleave', oldLeave); 

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Guarda refs pros próximos removes
    element._oldEnter = handleMouseEnter;
    element._oldLeave = handleMouseLeave;
}

// Função pra setup hover preview nas demos (usa o próprio data-action)
function setupDemoPreview(img) {
    img.style.transition = 'transform 0.4s ease';
    const action = img.dataset.action;

    const handleMouseEnter = () => {
        switch (action) {
            case 'scale':
                img.style.transform = 'scale(1.1)';
                break;
            case 'translate':
                img.style.transform = 'translateY(-5px)';
                break;
            case 'rotate':
                img.style.transform = 'rotateY(180deg)';
                break;
        }
    };

    const handleMouseLeave = () => {
        img.style.transform = 'none';
    };

    img.addEventListener('mouseenter', handleMouseEnter);
    img.addEventListener('mouseleave', handleMouseLeave);
}

export function setupCustomizeThemes(){
    const customizeThemesSection = document.getElementById('customize-themes');

    if(!customizeThemesSection) return;

    customizeThemesSection.innerHTML = `
        <div class="interface-page_texts">
            <h4 class="title-color">Preferência de interface</h4>
            <p>Customize a aparência da sua interface</p>
        </div>
        <div class="interface-actions">
            <img class="interface-theme__img" src="./img/interface-themes/dark-theme.webp" alt="Visualização do tema claro" data-theme="light">
            <img class="interface-theme__img" src="./img/interface-themes/dark-theme.webp" alt="Visualização do tema escuro" data-theme="dark">
            <img class="interface-theme__img" src="./img/interface-themes/dark-theme.webp" alt="Visualização do tema colorful" data-theme="colorful">
        </div>
    `
}

export function setupThemeSelection() {
  const themeImages = document.querySelectorAll('.interface-theme__img');
  const saveButton = document.getElementById('save-action');

  themeImages.forEach(setupThemePreview);
  
  themeImages.forEach(img => {
        img.addEventListener('click', () => {
            console.log('Tema clicado!');
        // Remove seleção anterior
        themeImages.forEach(i => i.classList.remove('active'));

        // Marca o tema atual
        img.classList.add('active');
    });
  });

    if(saveButton){
        saveButton.addEventListener('click', () => {
            const activeImg = document.querySelector('.interface-theme__img.active');
            if(!activeImg){
                alertMessage.show();
                return;
            }
            // Aplica o tema
            const selectedTheme = activeImg.dataset.theme;

            // Salva no localStorage
            localStorage.setItem('selectedTheme', selectedTheme);
            console.log(`Tema salvo: ${selectedTheme}. Recarregando...`);

            document.documentElement.setAttribute('data-theme', selectedTheme);

            location.reload();
        });
    }

    // Mantém o tema ao recarregar a página (roda no load);
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const activeThemeImg = document.querySelector(`[data-theme="${savedTheme}"]`);
    if(activeThemeImg) activeThemeImg.classList.add('active');
}

function setupThemePreview(img){
    img.style.transition = 'transform 0.3s ease';
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'none';
    });
}

export function setupCustomizeNavbar(){
    const customizeNavbarSection = document.getElementById('customizeNavbar');

    if(!customizeNavbarSection) return;

    customizeNavbarSection.innerHTML = '';

    customizeNavbarSection.innerHTML = `
        <div class="interface-page_texts">
            <h4 class="title-color">Preferência de cor do menu</h4>
            <p>Customize a aparência do menu principal</p>
        </div>
        <div class="navbar-color-change">
            <div class="interface-color__square pink-color-square square-shadow" data-square-color="pink"></div>
            <div class="interface-color__square purple-color-square square-shadow" data-square-color="purple"></div>
            <div class="interface-color__square red-color-square square-shadow" data-square-color="red"></div>
            <div class="interface-color__square gray-color-square square-shadow" data-square-color="gray"></div>
        </div>
    `
}

export function setupNavbarColor(){
    const squareColors = document.querySelectorAll('.interface-color__square');
    const saveButton = document.getElementById('save-action');

    if(!squareColors.length) return;

    squareColors.forEach(setupColorPreview);

    squareColors.forEach(color => {
        color.addEventListener('click', () => {
            console.log('Cor clicada!');
            //Remove a seleção anterior
            squareColors.forEach(i => i.classList.remove('active'));

            color.classList.add('active');
        });
    });

    if(saveButton){
        saveButton.addEventListener('click', () => {
            const activeColor = document.querySelector('.interface-color__square.active');
            if(!activeColor){
                alertMessage.show();
                return;
            }

            const selectedColor = activeColor.dataset.color;

            localStorage.setItem('selectedColor', selectedColor);
            console.log(`Cor salva: ${selectedColor}. Recarregando...`);

            document.documentElement.setAttribute('data-square-color', selectedColor);

            location.reload();
        });
    }

    const savedColor = localStorage.getItem('selectedColor') || 'pink';
    document.documentElement.setAttribute('data-square-color', savedColor);
    const activeColorSquare = document.querySelector(`[data-square-color="${savedColor}"]`);
    if(activeColorSquare) activeColorSquare.classList.add('active');
}

function setupColorPreview(color){
    color.style.transition = 'transform 0.3s ease';
    color.addEventListener('mouseenter', () => {
        color.style.transform = 'scale(1.05)';
    });

    color.addEventListener('mouseleave', () => {
        color.style.transform = 'none';
    });
}

export function setupCustomizeFontSection(){
    const customizeFontSection = document.getElementById('customizeFont');

    if(!customizeFontSection) return;

    customizeFontSection.innerHTML = `
        <div class="interface-page_texts">
            <h4 class="title-color">Estilo de fonte</h4>
            <p>Customize o estilo da fonte para textos e cabeçalhos</p>
        </div>
        <div class="interface-font__change">
            <div class="font-square font-roboto square-shadow" data-font="roboto">Aa</div>
            <div class="font-square font-funnel square-shadow" data-font="Funnel">Aa</div>
            <div class="font-square font-BBH square-shadow" data-font="BBH">Aa</div>
        </div>
    `
}

export function setupFontChange(){
    const squareFont = document.querySelectorAll('.font-square');
    const saveButton = document.getElementById('save-action');

    if(!squareFont.length) return;

    squareFont.forEach(setupFontPreview);

    squareFont.forEach(font => {
        font.addEventListener('click', () => {
            console.log('Estilo de fonte clicada!');
            // Remove a seleção anterior
            squareFont.forEach(i => i.classList.remove('active'));

            font.classList.add('active');
        });
    });

    if(saveButton){
        saveButton.addEventListener('click', () => {
            const activeFont = document.querySelector('.font-square.active');
            if(!activeFont){
                alertMessage.show();
                return;
            }

            const seletedFont = activeFont.dataset.font;

            localStorage.setItem('selectedFont', seletedFont);
            console.log(`Fonte salva: ${seletedFont}. Recarregando...`);

            document.documentElement.setAttribute('data-font', seletedFont);

            location.reload();

        });

        const savedFont = localStorage.getItem('selectedFont') || 'roboto';
        document.documentElement.setAttribute('data-font', savedFont);
        const activeFontSquare = document.querySelector(`[data-font="${savedFont}"]`);
        if(activeFontSquare) activeFontSquare.classList.add('active');
    }

}

function setupFontPreview(font){
    font.style.transition = 'transform 0.3s ease';
    font.addEventListener('mouseenter', () => {
        font.style.transform = 'scale(1.05)';
    });

    font.addEventListener('mouseleave', () => {
        font.style.transform = 'none';
    });
}

export function initializeSetupInterfaceSection(){
    setupCustomizeProfileImg();
    setupProfileImageActions()

    setupCustomizeThemes();
    setupThemeSelection();
    
    setupCustomizeNavbar();
    setupNavbarColor();

    setupCustomizeFontSection()
    setupFontChange()
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupInterfaceSection();
});