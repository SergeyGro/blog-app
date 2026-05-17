"use strict";

const API_URL = 'http://localhost:3000/posts';

export async function getPosts(currentPage, limitPage, searchQuery) {
    let url = `${API_URL}?_page=${currentPage}&_limit=${limitPage}`
    if (searchQuery.trim() !== '') {
        url += `&title_like=${encodeURIComponent(searchQuery)}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        const totalItems = parseInt(response.headers.get('X-Total-Count'), 10);
        return [posts, Math.ceil(totalItems / limitPage)];
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
        return [];
    }
}

export async function getPost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
        return [];
    }
}

export async function addPost(post) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(post)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
    }
}

export async function deletePost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
            return false;
        }
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
        return false;
    }
}

export async function editPost(id, title, body) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
    }
}