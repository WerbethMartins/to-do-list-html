import {initializeApi} from './dashboard/tarefas.js';
import { initializeSetupDashboardPage } from './dashboard/panels.js';
import {initializeMenu} from '../modules/navbar/pagination.js';
import { initializeSetupHomePage } from './home/home-panels.js';
import { initializeSetupTaskList } from './task-list/task-list.js';
import {initializeSetupSettingsPage } from './setting/profileSection.js';
import { initializeSetupSecuriteSection } from './setting/securiteSection.js';
import { initializeSetupInterfaceSection } from './setting/interfaceSection.js';
import { initializeAddtionalSetup } from './setting/additionalSetupSection.js';

$(document).ready(() => {
    initializeApi();
    initializeSetupDashboardPage();
    initializeMenu();
    initializeSetupHomePage();
    initializeSetupTaskList();
    initializeSetupSettingsPage();
    initializeSetupSecuriteSection();
    initializeSetupInterfaceSection();
    initializeAddtionalSetup();
});
