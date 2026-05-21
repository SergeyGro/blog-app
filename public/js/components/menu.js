"use strict";

import { getModal, openModal, closeModal, createPost} from "./modal.js";
import { addSearchQuery } from "../render.js";

const resize = window.matchMedia('(max-width: 760px)');
let searchIsActive = false;

export function initMenu() {
    renderMenu();
    openModal();
    closeModal();
    createPost();
    handleSearchPosts();
    handleResize();
    handleBtnSearch();
}

function renderMenu() {
    const header = document.querySelector('header');
    header.innerHTML =  `
        <div class="menu">
            <a href="/" class="home-link">Посты</a>
            <form name="searchForm" class="search-form">
                <input type="text" name="inputSearchForm" placeholder="Поиск по заголовку">
                <button name="btnSearchForm">Искать</button>
            </form>
            <button id="search-btn"><i class="fas fa-search"></i></button>
            <button id="show-modal-btn">Новый пост</button>
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

function handleResize() {
    const menu = document.querySelector('.menu');
    if (resize.matches) {
            menu.children[1].classList.add('inactive');
            menu.children[2].classList.remove('inactive');
        } else {
            menu.children[1].classList.remove('inactive');
            menu.children[2].classList.add('inactive');
        }
    resize.addEventListener('change', () => {
        if (resize.matches) {
            menu.children[1].classList.add('inactive');
            menu.children[2].classList.remove('inactive');
        } else {
            menu.children[1].classList.remove('inactive');
            menu.children[2].classList.add('inactive');
        }
    })
}

function handleBtnSearch() {
    const btn = document.getElementById('search-btn');
    const menu = document.querySelector('.menu');
    btn.addEventListener('click', () => {
        searchIsActive = !searchIsActive;
        if (searchIsActive === true) {
            menu.children[2].innerHTML = '<i class="fas fa-times clear-search"></i>';
        } else {
            menu.children[2].innerHTML = '<i class="fas fa-search"></i>';
        }
        menu.children[0].classList.toggle('inactive');
        menu.children[1].classList.toggle('inactive');
        menu.children[3].classList.toggle('inactive');
    })
}