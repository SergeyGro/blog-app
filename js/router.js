"use strict";

import { renderHome, renderPost, initPosts } from "./render.js";

export function renderRoute(path) {
    const app = document.getElementById('app');
    if (path === '/') {
        app.innerHTML = renderHome();
        initPosts();
    } else if (!isNaN(path)){
        app.innerHTML = renderPost(path);
    } else {
        app.innerHTML = '<h1>404</h1><p>Такой страницы нет</p>';
    }
}

export function handleLinks() {
    const pageLinks = document.querySelectorAll('.read-more');
    pageLinks.forEach(link => link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        history.pushState(null, null, href);
        renderRoute(href);
    }))
}