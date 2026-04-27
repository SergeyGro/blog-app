"use strict";

import { renderHome, renderPost, initPosts } from "./render.js";

const routes = {
    '/': renderHome(),
    '/post': renderPost()
}

export function renderRoute(path) {
    let normalizedPath = path;
    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
        normalizedPath = normalizedPath.slice(0, -1);
    }
    const app = document.getElementById('app');
    if (routes[normalizedPath]) {
        app.innerHTML = routes[normalizedPath];
        if(normalizedPath === '/') initPosts();
    } else {
        app.innerHTML = '<h1>404</h1><p>Такой страницы нет</p>';
    }
}

export function handleLinks() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href === window.location.pathname) {
                return;
            }
            history.pushState(null, null, href);
            renderRoute(href);
        });
    });
}