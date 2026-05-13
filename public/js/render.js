"use strict";

import { getPosts, getPost, deletePost, editPost } from "./api.js";
import { handleLinks } from "./router.js";

let currentPage = 1;
const pageСounts = 10;

export async function initPosts() {
    const posts = await getPosts();
    renderPosts(posts);
    renderPagination(posts);
    handleBtnPagesNav(posts);
}

export async function initPost(href) {
    const post = await getPost(href);
    renderPost(post);
    handleEdit(post);
    handleDelete(false);
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

export function renderPosts(posts){
    const postsBlock = document.querySelector('.posts-block');
    const end = pageСounts * currentPage;
    const start = end - pageСounts;
    const portionPosts = posts.slice(start, end);
    if (portionPosts.length === 0) {
        currentPage--;
        return renderPosts(posts);
    }
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
    handleDelete(true);
}

function renderPost(post) {
    const postBlock = document.querySelector('.container-post');
    postBlock.innerHTML = `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        <button class="edit-post-btn" data-id="${post.id}">Редактировать</button>
        <a href="/" class="home-link-post">Назад к списку</a>
        <button class="delete-post-btn" data-id="${post.id}">X</button>`;
}

function renderPagination(posts) {
    const nav = document.querySelector('.pagination');
    const totalPages = Math.ceil(posts.length / pageСounts);
    const start = currentPage - 2 < 1 ? 1 : currentPage - 2;
    const end = currentPage + 2 > totalPages ? totalPages : currentPage + 2;
    let pageElements = '';
    for (let i = start; i <= end; i++){
        const page = `<li><a href="#">${i}</a></li>`;
        pageElements = pageElements + page;
    }
    if (start > 2) pageElements = '<li><a href="#">1</a></li><li>...</li>' + pageElements;
    if (totalPages - end > 1) pageElements = pageElements + `<li>...</li><li><a href="#">${totalPages}</a></li>`;
    if (start === 2) pageElements = '<li><a href="#">1</a></li>' + pageElements;
    if (totalPages - end === 1) pageElements = pageElements + `<li><a href="#">${totalPages}</a></li>`;
    nav.children[1].innerHTML = pageElements;
    handlePagesNav(posts)
    showCurrentPage();
}

function handlePagesNav(posts) {
    const pages = document.querySelector('.nav-pages');
    for (let page of pages.children) {
        page.firstChild.addEventListener('click', e => {
            e.preventDefault();
            currentPage = Number(page.firstChild.text);
            renderPosts(posts);
            renderPagination(posts);
        })
    }
}

function handleBtnPagesNav(posts) {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    prevBtn.addEventListener('click', () => {
        if(currentPage > 1) {
            currentPage = currentPage - 1;
            renderPosts(posts);
            renderPagination(posts);
        }
    })
    nextBtn.addEventListener('click', () => {
        if(currentPage < Math.ceil(posts.length / pageСounts)) {
            currentPage = currentPage + 1;
            renderPosts(posts);
            renderPagination(posts);
        }
    })
}

function handleDelete(isHome) {
    const btn = document.querySelectorAll('.delete-post-btn');
    btn.forEach(e => e.addEventListener('click', async () => {
        if (confirm('Удалить пост?')) {
            if (isHome) {
                await deletePost(e.dataset.id);
                return initPosts();
            } else {
                const res = await deletePost(e.dataset.id);
                if (res) {
                    const postBlock = document.querySelector('.container-post');
                    postBlock.innerHTML = `
                        <h1>Пост удален</h1>
                        <a href="/" class="home-link-post">Назад к списку</a>`;
                } else {
                    return;
                }
            }
        } 
    }))
}

function handleEdit(post) {
    const btn = document.querySelector('.edit-post-btn');
    const postBlock = document.querySelector('.container-post');
    let isEditing = false;
    btn.addEventListener('click', async function(e) {
        if(!isEditing) {
            postBlock.children[0].innerHTML = `<input type="text" value="${post.title}">`;
            postBlock.children[1].innerHTML = `<input type="text" value="${post.body}">`;
            postBlock.children[2].innerHTML = 'Сохранить';
            isEditing = true;
        } else {
            await editPost(post.id, postBlock.children[0].children[0].value, postBlock.children[1].children[0].value);
            initPost(post.id.toString());
        }
    })
}

function showCurrentPage() {
    const pages = document.querySelector('.nav-pages');
    for (let page of pages.children) {
        if (page.firstChild.tagName === 'A') {
            page.firstChild.classList.toggle('active-page', Number(page.firstChild.text) === currentPage);
        }
    }
}