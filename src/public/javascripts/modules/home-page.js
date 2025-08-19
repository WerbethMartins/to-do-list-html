// Calendário
export function setupCalendar(){
    const dayElement = $('#day');
    const monthYearElement = $('#month-year');

    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();

    dayElement.text(day);
    monthYearElement.text(`${month} ${year}`);
}

export function initializeSetupHomePage(){
    setupCalendar();
}
