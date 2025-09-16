import {initializeApi} from './apiTarefa.js';
import {initializeMenu} from './pagination.js';
import { initializeSetupHomePage } from './Home/home-panels.js';

$(document).ready(() => {
    initializeApi();
    initializeMenu();
    initializeSetupHomePage();
});
