"use strict";

import { getPosts } from "./api.js";

export async function renderPosts(){
    const posts = await getPosts();
    const postsBlock = document.querySelector('.posts-block');
    postsBlock.innerHTML = `${posts.map(post => `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </div>
        `).join('')}
    `
}

export function renderHome(){
    return `
        <div class="container">
            <h1>Посты</h1>
            <div class="posts-block">

            </div>
        </div>`;
}

export function renderPost(){
    return `
        <h1>Пост</h1>
        <div>
            <p>Описание поста</p>
            <p>Еще инфа</p>
        </div>`;
}