"use strict";

const BASE_URL = '../data/posts.json';

export async function getPosts() {
    try {
        const response = await fetch(`${BASE_URL}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch(err){
        console.error(`Ошибочка вышла: ${err}`);
        return [];
    }
}

// export async function getPost(postId) {
//     try {
//         const response = await fetch(`${BASE_URL}${postId}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return await response.json();
//     } catch(err){
//         console.error(`Ошибочка вышла: ${err}`);
//         return [];
//     }
// }