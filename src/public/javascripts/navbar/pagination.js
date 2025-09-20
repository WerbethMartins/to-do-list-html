function debounce(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Função para configurar o menu de itens
export function setupItemsMenu(){
    const itemsMenu = $('.menu-items');

    // Adiciona evento de clique a cada item clicado
    itemsMenu.each(function(index){
        $(this).on('click', function() {
             // Debug 
            console.log('Item clicked:', index);

            // Atualiza o título principal com base no item do menu clicado
            addTitlePerItem($(this).data('menu-items'));
            itemMenuControll($(this).data('menu-items'));
        });
    });
}

// Função para atualizar o título principal
function addTitlePerItem(menuKey) {
    const titles = {
        dashboard: 'Dashboard | Crie uma nova tarefa, veja suas tarefas concluidas e mais.',
        mytasks: 'Aqui estão suas tarefas | My Tasks',
        settings: 'Aqui estão suas tarefas | Settings',
        help: 'Aqui estão suas tarefas | Help'
    };

    // Atualiza o título principal
    $('.main-title').text(titles[menuKey] || 'Título não reconhecido');
}

function itemMenuControll(menuKey){
    const allPanels = $('#home, #dashboard, #mytasks, #settings, #help');
    
    allPanels.addClass('hidden').removeClass('visible');
    
    const selectedPanel = $('#' + menuKey);
    selectedPanel.addClass('visible').removeClass('hidden');

    // Fallback
    if (!selectedPanel.length) {
        console.log('Menu item não reconhecido: ' + menuKey);
    }
}

export function initializeMenu(){
    setupItemsMenu();
}

