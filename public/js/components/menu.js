"use strict";

import { getModal, openModal, closeModal, createPost} from "./modal.js";
import { addSearchQuery } from "../render.js";

export function initMenu() {
    renderMenu();
    openModal();
    closeModal();
    createPost();
    handleSearchPosts();
}

function renderMenu() {
    const header = document.querySelector('header');
    header.innerHTML =  `
        <div class="menu">
            <a href="/" class="home-link">Посты</a>
            <form name="searchForm" id="searchForm">
                <input type="text" name="inputSearchForm" placeholder="Поиск по заголовку">
                <button name="btnSearchForm">Искать</button>
            </form>
            <button id="showModalBtn">Новый пост</button>
        </div>
        ${getModal()}
    `
}

function handleSearchPosts() {
    const searchForm = document.forms.searchForm;
    searchForm.btnSearchForm.addEventListener('click', async e => {
        e.preventDefault();
        addSearchQuery(searchForm.inputSearchForm.value);
    })
}