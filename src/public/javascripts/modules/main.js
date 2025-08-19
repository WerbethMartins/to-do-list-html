import {initializeApi} from './apiControll.js';
import {initializeMenu} from './navbar.js';
import { initializeSetupHomePage } from './home-page.js';

$(document).ready(() => {
    initializeApi();
    initializeMenu();
    initializeSetupHomePage();
});