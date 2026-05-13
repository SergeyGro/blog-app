"use strict";

import { getModal, openModal, closeModal, createPost} from "./modal.js";
import { searchPosts } from "../api.js";
import { renderPosts } from "../render.js";

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
            <form name="searchForm">
                <input type="text" name="inputSearchForm">
                <button name="btnSearchForm">Поиск</button>
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
        const res = await searchPosts(searchForm.inputSearchForm.value);
        console.log(res)
        renderPosts(res);
    })
}