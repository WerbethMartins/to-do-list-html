export function additionalSetupNotification(){
    const notificationItems = document.getElementById('notificacao');

    if(!notificationItems) return;

    notificationItems.innerHTML = `
        <div class="additional-setup-texts">
            <h4 class="title-color">Notificações</h4>
            <p>Receber e-mails de atualizações</p>
        </div>
        <div class="additional-setup-options">
            <label class="additional-setup-item">
                <span>E-mail</span>
                <input type="checkbox" id="emailUpdates">
            </label>
            <label class="additional-setup-item">
                <span>Navegador</span>
                <input type="checkbox" id="browserNotifications">
            </label>
        </div>
    `
}

export function additionalSetupRestauration(){
    const restaurationItems = document.getElementById('restauration');

    if(!restaurationItems) return;

    restaurationItems.innerHTML  = `
        <div class="additional-setup-texts">
            <h4 class="settings-page__title title-color">Restauração</h4>
            <p>Restaure todas as configurações</p>
        </div>
        <div class="additional-setup-button">
            <button class="btn info-btn">Restaurar configuração padrão</button>
        </div>
    `
}

export function additionalSetupDeleteAccount(){
    const deleteAccount = document.getElementById('deleteAccount');

    if(!deleteAccount) return;

    deleteAccount.innerHTML = `
        <div class="additional-setup-texts">
            <h4 class="settings-page__title title-color">Excluir conta</h4>
            <p>Você pode excluir permanentemente sua conta</p>
        </div>
        <div class="additional-setup-button">
            <button type="button" class="btn danger-btn">Excluir conta</button>
        </div>
    `
}

export function initializeAddtionalSetup(){
    additionalSetupNotification();
    additionalSetupRestauration();
    additionalSetupDeleteAccount();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeAddtionalSetup();
})