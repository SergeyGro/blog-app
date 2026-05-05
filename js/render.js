"use strict";

import { getPosts, getPost } from "./api.js";
import { handleLinks } from "./router.js";

let allPosts = [];
let currentPage = 1;
const pageСounts = 10; 

export async function initPosts() {
    allPosts = await getPosts();
    renderPosts();
    renderPagination();
    handlePagesNav();
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

// export function renderPost(href) {
//     const postId = Number(href.slice(6));
//     const post = allPosts.find(p => p.postId === postId);
//     return `
//         <div class="container container-post">
//             <h1>${post.title}</h1>
//             <div>
//                 <p>${post.body}</p>
//                 <p>${post.thumbnail}</p>
//             </div>
//             <a href="/" class="home-link-post">Назад к списку</a>
//         </div>`;
// }

export async function renderPost(href) {
    const post = await getPost(href);
    return `
        <div class="container container-post">
            <h1>${post.title}</h1>
            <div>
                <p>${post.body}</p>
                <p>${post.thumbnail}</p>
            </div>
            <a href="/" class="home-link-post">Назад к списку</a>
        </div>`;
}

function renderPosts(){
    const postsBlock = document.querySelector('.posts-block');
    const end = pageСounts * currentPage;
    const start = end - pageСounts;
    const portionPosts = allPosts.slice(start, end);
    postsBlock.innerHTML = `${portionPosts.map(post => `
            <article class="post">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <a href="${post.id}" class="read-more">Читать далее</a>
            </article>
        `).join('')}
    `;
    handleLinks();
}

function renderPagination() {
    const nav = document.querySelector('.pagination');
    const maxPages = Math.ceil(allPosts.length / pageСounts);
    let pageElements = '';
    for (let i = 1; i <= maxPages; i++){
        const page = `<li><a href="#">${i}</a></li>`;
        pageElements = pageElements + page;
    }
    nav.childNodes[3].innerHTML = pageElements;
    showCurrentPage();
}

function handlePagesNav() {
    const pages = document.querySelector('.nav-pages');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    pages.childNodes.forEach(elem => elem.firstChild.addEventListener('click', e => {
        e.preventDefault();
        currentPage = Number(e.target.text);
        showCurrentPage()
        renderPosts();
    }));
    prevBtn.addEventListener('click', () => {
        if(currentPage > 1) {
            currentPage = currentPage - 1;
            showCurrentPage()
            renderPosts();
        }
    })
    nextBtn.addEventListener('click', () => {
        if(currentPage < Math.ceil(allPosts.length / pageСounts)) {
            currentPage = currentPage + 1;
            showCurrentPage()
            renderPosts();
        }
    })
}

function showCurrentPage() {
    const pages = document.querySelector('.nav-pages');
    pages.childNodes.forEach(elem => elem.firstChild.classList.toggle('active-page', Number(elem.firstChild.text) === currentPage));
}