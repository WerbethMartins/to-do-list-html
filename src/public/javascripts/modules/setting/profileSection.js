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

export function initializeSetupSettingsPage(){
    setupProfileSection();
    setupProfileImage();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSetupSettingsPage();
});