"use strict";

import { getPosts } from "./api.js";

let allPosts = [];
let currentPage = 1;
const pageСounts = 6; 

export async function initPosts() {
    allPosts = await getPosts();
    renderPosts();
    renderPagination();
}

function renderPosts(){
    const postsBlock = document.querySelector('.posts-block');
    postsBlock.innerHTML = `${allPosts.map(post => `
            <article class="post">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <a href="/get/${post.postId}" class="read-more">Читать далее</a>
            </article>
        `).join('')}
    `
}

export function renderHome() {
    return `
        <div class="container">
            <h1>Посты</h1>
            <div class="posts-block">

            </div>
            <nav class="pagination"></nav>
        </div>`;
}

function renderPagination() {
    const nav = document.querySelector('.pagination');
    const maxPages = Math.ceil(allPosts.length / pageСounts);
    let pageElements = '';
    for (let i = 1; i <= maxPages; i++){
        const page = `<a href="#">${i}</a>`;
        pageElements = pageElements + page;
    }
    nav.innerHTML = pageElements;
}

export function renderPost() {
    return `
        <h1>Пост</h1>
        <div>
            <p>Описание поста</p>
            <p>Еще инфа</p>
        </div>`;
}