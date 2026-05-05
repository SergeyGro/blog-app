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