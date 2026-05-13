"use strict";

const API_URL = 'http://localhost:3000/posts';

export async function getPosts() {
    try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
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

export async function searchPosts(request) {
    try {
        const response = await fetch(`${API_URL}?title_like=${request}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
        return [];
    }
}