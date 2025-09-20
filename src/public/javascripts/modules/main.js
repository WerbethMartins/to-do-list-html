import {initializeApi} from './dashboard/tarefas.js';
import { initializeSetupDashboardPage } from './dashboard/panels.js';
import {initializeMenu} from '../navbar/pagination.js';
import { initializeSetupHomePage } from './Home/home-panels.js';

$(document).ready(() => {
    initializeApi();
    initializeSetupDashboardPage();
    initializeMenu();
    initializeSetupHomePage();
});
