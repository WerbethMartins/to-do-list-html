export function setupSecuriteProfileSection(){
    const securiteSection = document.getElementById('securite');

    if(!securiteSection) return;

    securiteSection.innerHTML = '';

    securiteSection.innerHTML = `
        <div class="security-section">
            <h4 class="title-color">Alterar o nome de usuário</h4>
            <form class="security-form">
                <input type="text" placeholder="Novo nome de usuário">
                <button type="submit"class="btn btn-security">Atualizar</button>
            </form>
        </div>

        <div class="divider"></div>

        <div class="security-section">
            <h4 class="title-color">Alterar a senha</h4>
            <button id="button-change-password" class="btn btn-change-password">Mudar senha</button>
            <form class="security-form-update-password hidden">
                <div class="change-password-inputs">
                    <input type="password" placeholder="Senha atual">
                    <input type="password" placeholder="Nova senha">
                    <input type="password" placeholder="Confirmar nova senha">
                </div>
                <button type="submit"class="btn btn-security">Atualizar senha</button>
            </form>
        </div>

        <div class="security-section">
            <h4 class="title-color">Verificação de duas etapas</h4>
            <input type="checkbox" id="checkboxInput" class="checkboxInput">
            <label for="checkboxInput" class="toggleSwitch">
            </label>
        </div>

        <div class="divider"></div>

        <div class="security-section">
            <h4 class="title-color">Sessões ativas</h4>
            <ul class="sessions-list">
            <li>Chrome - Windows 10 (último acesso: hoje 14:23)</li>
            <li>Firefox - Android (último acesso: ontem 20:47)</li>
            </ul>
            <button class="btn btn-security">Encerrar todas sessões</button>
        </div>
    `
}

export function configFormUpdatePassword(){
    const visibilityButton = document.getElementById('button-change-password');
    const updateForm = document.querySelector('.security-form-update-password');

   if(updateForm && visibilityButton){
    $(visibilityButton).on('click', () => {
        if($(updateForm).hasClass('visible')){
            $(updateForm).removeClass('visible').addClass('hidden').slideUp("slow");
            $(visibilityButton).text('Mudar senha').css('background-color', '#2196f3');
        } else {
            $(updateForm).removeClass('hidden').addClass('visible').slideDown("slow");
            $(visibilityButton).text('Cancelar').css('background-color', 'red');
        }
    });
   } 
}

export function initializeSetupSecuriteSection(){
    setupSecuriteProfileSection();
    configFormUpdatePassword();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupSecuriteSection();
});