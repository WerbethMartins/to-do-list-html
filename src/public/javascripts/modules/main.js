import {initializeApi} from './dashboard/tarefas.js';
import { initializeSetupDashboardPage } from './dashboard/panels.js';
import {initializeMenu} from '../modules/navbar/pagination.js';
import { initializeSetupHomePage } from './Home/home-panels.js';
import { initializeSetupTaskList } from './task-list/task-list.js';

$(document).ready(() => {
    initializeApi();
    initializeSetupDashboardPage();
    initializeMenu();
    initializeSetupHomePage();
    initializeSetupTaskList();
});
