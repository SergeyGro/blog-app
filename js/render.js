"use strict";

import { getPosts, getPost, deletePost } from "./api.js";
import { handleLinks } from "./router.js";

let currentPage = 1;
const pageСounts = 10;

export async function initPosts() {
    const posts = await getPosts();
    renderPosts(posts);
    renderPagination(posts);
    handlePagesNav(posts);
}

export async function initPost(href) {
    const post = await getPost(href);
    renderPost(post);
    handleEdit();
}

export function renderHome() {
    return `
        <div class="container container-posts">
            <div class="posts">
                <div class="posts-block">

                </div>
            </div>
            <nav class="pagination">
                <button id="prev-page">Назад</button>
                <ul class="nav-pages"></ul>
                <button id="next-page">Вперед</button>
            </nav>
        </div>`;
}

export function renderPostPage() {
    return `
        <div class="container container-post">
            
        </div>`;
}

function renderPosts(posts){
    const postsBlock = document.querySelector('.posts-block');
    const end = pageСounts * currentPage;
    const start = end - pageСounts;
    const portionPosts = posts.slice(start, end);
    postsBlock.innerHTML = `${portionPosts.map(post => `
            <article class="post">
                <h2>${post.title}</h2>
                <button class="delete-post-btn" data-id="${post.id}">X</button>
                <p>${post.body}</p>
                <a href="${post.id}" class="read-more">Читать далее</a>
            </article>
        `).join('')}
    `;
    handleLinks();
    handleDelete();
}

function renderPost(post) {
    const postBlock = document.querySelector('.container-post');
    postBlock.innerHTML = `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        <button class="edit-post-btn" data-id="${post.id}">Редактировать</button>
        <a href="/" class="home-link-post">Назад к списку</a>
        <button>X</button>`;
}

function renderPagination(posts) {
    const nav = document.querySelector('.pagination');
    const maxPages = Math.ceil(posts.length / pageСounts);
    let pageElements = '';
    for (let i = 1; i <= maxPages; i++){
        const page = `<li><a href="#">${i}</a></li>`;
        pageElements = pageElements + page;
    }
    nav.childNodes[3].innerHTML = pageElements;
    showCurrentPage();
}

function handlePagesNav(posts) {
    const pages = document.querySelector('.nav-pages');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    pages.childNodes.forEach(elem => elem.firstChild.addEventListener('click', e => {
        e.preventDefault();
        currentPage = Number(e.target.text);
        showCurrentPage()
        renderPosts(posts);
    }));
    prevBtn.addEventListener('click', () => {
        if(currentPage > 1) {
            currentPage = currentPage - 1;
            showCurrentPage()
            renderPosts(posts);
        }
    })
    nextBtn.addEventListener('click', () => {
        if(currentPage < Math.ceil(posts.length / pageСounts)) {
            currentPage = currentPage + 1;
            showCurrentPage()
            renderPosts(posts);
        }
    })
}

function handleDelete() {
    const btn = document.querySelectorAll('.delete-post-btn');
    btn.forEach(e => e.addEventListener('click', () => {
        if (confirm('Удалить пост?')) deletePost(e.dataset.id);
        return;
    }))
}

function handleEdit() {
    const btn = document.querySelector('.edit-post-btn');
    btn.addEventListener('click', () => {

    })
}

function showCurrentPage() {
    const pages = document.querySelector('.nav-pages');
    pages.childNodes.forEach(elem => elem.firstChild.classList.toggle('active-page', Number(elem.firstChild.text) === currentPage));
}