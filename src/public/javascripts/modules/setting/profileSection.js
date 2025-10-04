export function setupItemsMenu(){
    const itemsMenu = $('.setting-navbar-item');

    itemsMenu.each(function(){
        $(this).on('click', function() {
            const key = $(this).data('setting-navbar-item');
            addTitlePerItem(key);
            itemMenuControll(key);
        });
    });

    // Inicia mostrando perfil por padrão
    addTitlePerItem('perfilSettings');
    itemMenuControll('perfilSettings');
}


function addTitlePerItem(menuKey){
    const titles = {
        perfilSettings: 'Configuração do perfil',
        securite: 'Login e segurança',
        interface: 'Configuração de interface',
        additionalSettings: 'Configurações adicionais'
    };
    $('.setting-title').text(titles[menuKey] || 'Título não reconhecido');
}

function itemMenuControll(menuKey){
    const selectedPage = $('#' + menuKey);

    if (!selectedPage.length) {
        console.log('Menu item não reconhecido: ' + menuKey);
        return;
    }

    if (selectedPage.hasClass('visible')) {
        return; // já está aberta
    }

    // Esconde todas
    $('.settings-page').addClass('hidden').removeClass('visible');

    // Mostra só a clicada
    selectedPage.removeClass('hidden').addClass('visible');
}
export function setupProfileSection(){
    const profileSection = document.querySelector('.profile');

    if(!profileSection) return;

    profileSection.innerHTML = '';

    profileSection.innerHTML = `
        <!-- A imagem do perfil -->
        <label for="setting-choose-profile-img" class="setting-profile-label">
            <img 
                src="./img/profile-img/profile-icon-design-free-vector.jpg"
                id="profilePreview"
                class="profile__img"
                alt="Imagem de perfil do usuário"
            >
            <span class="overlay">Trocar foto</span>
        </label>

        <div class="profile__btn">
            <label type="button" for="profileInput" id="chooseProfileImg" class="btn choose-btn">Escolher imagem de perfil</label>
            <button type="button" id="removeProfileImg" class="btn remove-btn">Remover imagem de perfi</button>
        </div>

        <input 
            type="file" 
            id="profileInput" 
            name="profile-img" 
            accept="image/*" 
            class="file__input"
        >
    `

    setupProfileImage();
}

export function setupProfileImage(){
    const inputFile = document.getElementById("setting-choose-profile-img");
    const inputFileButton = document.getElementById("profileInput");
    const profilePreview = document.getElementById("profilePreview");

    inputFileButton.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
            profilePreview.setAttribute("src", this.result);
            });

            reader.readAsDataURL(file); // Lê o arquivo como base64
        }
    });
}

export function setupProfileForm(){
    const profileForm = document.querySelector('.profile-page__form');

    if(!profileForm) return;

    profileForm.innerHTML = '';

    profileForm.innerHTML = `
        <div class="name-lastname-section">
            <div class="name-section">
            <label for="name">Nome:</label> 
            <input type="text" id="name" class="input name-input">
            </div>
            <div class="lastname-section">
            <label for="lastName">Sobrenome:</label>
            <input type="text" id="lastName" class="input last-name-input">
            </div>
        </div>
        <div class="username-email-section">
            <div class="username-section">
            <label for="username">Nome de usuário:</label>
            <input type="text" id="username" class="input username-input">
            </div>
            <div class="email-section">
            <label for="email">Email:</label>
            <input type="text" id="email" class="input email-input">
            </div>
        </div>
        <div class="phonenumber-section">
            <label for="phoneNumber">Número de telefone:</label>
            <input type="text" id="phoneNumber" class="input phone-number-input">
        </div>
        <div class="bio-section">
            <label for="bio">Biografia:</label>
            <textarea type="text" id="bio" class="bio-textarea"></textarea>
        </div>
        <div class="form-button-section">
            <button type="button" id="updateProfile" class="btn btn-update-profile">Atualizar perfil</button>
        </div>
    `
}

export function initializeSetupSettingsPage(){
    setupProfileSection();
    setupProfileImage();
    setupProfileForm();
    setupItemsMenu();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupSettingsPage();
});