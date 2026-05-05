"use strict";

import { getModal, openModal, closeModal, addPost } from "./modal.js";

export function initMenu() {
    renderMenu();
    openModal();
    closeModal();
    addPost();
}

function renderMenu() {
    const header = document.querySelector('header');
    header.innerHTML =  `
        <div class="menu">
            <a href="/" class="home-link">Посты</a>
            <button id="showModalBtn">Новый пост</button>
        </div>
        ${getModal()}
    `
}