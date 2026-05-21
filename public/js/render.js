"use strict";

import { getPosts, getPost, deletePost, editPost } from "./api.js";
import { handleLinks } from "./router.js";

const state = {
    posts: [],
    currentPage: 1,
    limitPage: 6,
    totalPages: 1,
    searchQuery: ''
}

async function getState() {
    const res = await getPosts(state.currentPage, state.limitPage, state.searchQuery);
    state.posts = res[0];
    state.totalPages = res[1];
}

export async function initHome() {
    await initPage();
    handleBtnPagesNav();
}

export async function initPage() {
    await getState();
    renderPosts();
    renderPagination();
}

export async function initPost(href) {
    const post = await getPost(href);
    renderPost(post);
    handleEdit(post);
    handleDelete(false);
}

export function addSearchQuery(value) {
    state.searchQuery = value;
    state.currentPage = 1;
    initPage();
}

export function renderHome() {
    return `
        <div class="container container-posts">
            <div class="posts">
                <div class="posts">

                </div>
            </div>
            <nav class="pagination">
                <button id="prev-page"><i class="fas fa-chevron-left"></i></button>
                <ul class="nav-pages"></ul>
                <button id="next-page"><i class="fas fa-chevron-right"></i></button>
            </nav>
        </div>`;
}

export function renderPostPage() {
    return `
        <div class="container container-post"></div>`;
}

function renderPosts(){
    const postsBlock = document.querySelector('.posts');
    const pagination = document.querySelector('.pagination');
    if (state.posts.length === 0 && state.currentPage !== 1) {
        state.currentPage--;
        return initPage();
    }
    if (state.posts.length === 0 && state.currentPage === 1) {
        postsBlock.innerHTML = '<h1>Список пуст :(</h1>';
        pagination.classList.add('inactive');
        return;
    }
    pagination.classList.remove('inactive');
    postsBlock.innerHTML = `${state.posts.map(post => `
            <article class="post">
                <h2>${post.title}</h2>
                <button data-id="${post.id}"><i class="fas fa-trash-alt"></i></button>
                <p>${post.body}</p>
                <a href="${post.id}" class="read-more">Читать далее</a>
            </article>
        `).join('')}
    `;
    handleLinks();
    handleDelete(true);
}

function renderPost(post) {
    const postBlock = document.querySelector('.container-post');
    postBlock.innerHTML = `
    <div class="post-text-block">
        <h1>${post.title}</h1>
        <p>${post.body}</p>
    </div>
    <div class="post-btn-block">
        <button class="edit-post-btn" data-id="${post.id}">Редактировать</button>
        <button class="delete-post-btn" data-id="${post.id}">Удалить пост</button>
    </div>
    <a href="/" class="home-link-post"><i class="fas fa-chevron-left"></i> Назад к списку</a>`;
}

function renderPagination() {
    const nav = document.querySelector('.pagination');
    const start = state.currentPage - 2 < 1 ? 1 : state.currentPage - 2;
    const end = state.currentPage + 2 > state.totalPages ? state.totalPages : state.currentPage + 2;
    let pageElements = '';
    for (let i = start; i <= end; i++){
        const page = `<li><a href="#">${i}</a></li>`;
        pageElements = pageElements + page;
    }
    if (start > 2) pageElements = '<li><a href="#">1</a></li><li>...</li>' + pageElements;
    if (state.totalPages - end > 1) pageElements = pageElements + `<li>...</li><li><a href="#">${state.totalPages}</a></li>`;
    if (start === 2) pageElements = '<li><a href="#">1</a></li>' + pageElements;
    if (state.totalPages - end === 1) pageElements = pageElements + `<li><a href="#">${state.totalPages}</a></li>`;
    nav.children[1].innerHTML = pageElements;
    handlePagesNav()
    showCurrentPage();
}

function handlePagesNav() {
    const pages = document.querySelector('.nav-pages');
    for (let page of pages.children) {
        page.firstChild.addEventListener('click', async e => {
            e.preventDefault();
            state.currentPage = Number(page.firstChild.text);
            await initPage();
        })
    }
}

function handleBtnPagesNav() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    prevBtn.addEventListener('click', async () => {
        if(state.currentPage > 1) {
            state.currentPage--;
            await initPage();
        }
    })
    nextBtn.addEventListener('click', async () => {
        if(state.currentPage < state.totalPages) {
            state.currentPage++;
            await initPage();
        }
    })
}

function handleDelete(isHome) {
    const btn = document.querySelectorAll('.delete-post-btn');
    btn.forEach(e => e.addEventListener('click', async () => {
        if (confirm('Удалить пост?')) {
            if (isHome) {
                await deletePost(e.dataset.id);
                return initPage();
            } else {
                const res = await deletePost(e.dataset.id);
                if (res) {
                    const postBlock = document.querySelector('.container-post');
                    postBlock.innerHTML = `
                        <h1>Пост удален</h1>
                        <a href="/" class="home-link-post"><i class="fas fa-chevron-left"></i> Назад к списку</a>`;
                } else {
                    return;
                }
            }
        } 
    }))
}

function handleEdit(post) {
    const btn = document.querySelector('.edit-post-btn');
    const postTextBlock = document.querySelector('.post-text-block');
    let isEditing = false;
    btn.addEventListener('click', async function(e) {
        if(!isEditing) {
            postTextBlock.children[0].innerHTML = `<input id="edit-title" type="text" value="${post.title}">`;
            postTextBlock.children[1].innerHTML = `<textarea id="edit-body" rows="8" required>${post.body}</textarea>`;
            btn.innerHTML = 'Сохранить';
            isEditing = true;
        } else {
            await editPost(post.id, postTextBlock.children[0].children[0].value, postTextBlock.children[1].children[0].value);
            initPost(post.id.toString());
        }
    })
}

function showCurrentPage() {
    const pages = document.querySelector('.nav-pages');
    for (let page of pages.children) {
        if (page.firstChild.tagName === 'A') {
            page.firstChild.classList.toggle('active-page', Number(page.firstChild.text) === state.currentPage);
        }
    }
}