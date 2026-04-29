"use strict";

const BASE_URL = 'https://api.openjavascript.info';

export async function getPosts() {
    try {
        const response = await fetch(`${BASE_URL}/get`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
        return [];
    }
}

export async function getPost(postId) {
    try {
        const response = await fetch(`${BASE_URL}${postId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
        return [];
    }
}