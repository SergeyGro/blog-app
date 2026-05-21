"use strict";

import Post from "./post.js";
import { addPost } from "../api.js";
import { initPage } from "../render.js";

export function openModal(){
  const modalBtn = document.getElementById('show-modal-btn');
  const modal = document.getElementById('modal');
  modalBtn.addEventListener('click', () => {
    modal.showModal();
  })
}

export function closeModal(){
    const cancelBtn = document.getElementById('reset-modal');
    cancelBtn.addEventListener('click', () => {
        modal.close(); 
    });
}

export async function createPost() {
    const btn = document.getElementById('add-post-btn');
    btn.addEventListener('click', async function(e) {
        const postForm = document.forms.postForm;
        if(postForm.title.style.borderColor === 'red' && postForm.title.value !== ''){
            postForm.title.style.borderColor = 'black';
        }
        if(postForm.body.style.borderColor === 'red' && postForm.body.value !== ''){
            postForm.body.style.borderColor = 'black';
        }
        if (postForm.title.value === '' || postForm.body.value === ''){
            e.preventDefault()
            if (postForm.title.value === ''){
                postForm.title.style.borderColor = 'red';
            }
            if (postForm.body.value === ''){
                postForm.body.style.borderColor = 'red';
            }
            return;
        }
        const post = new Post(postForm.title.value, postForm.body.value);
        await addPost(post.getPost());
        if(window.location.pathname === '/') initPage();
        postForm.reset();
    })
}

export function getModal(){
    return `
        <dialog id="modal">
            <form method="dialog" name="postForm" class="modal-form">
                <div class="modal-input-block">
                    <label for="title">Заголовок</label>
                    <input type="text" id="title" name="title" autofocus>
                </div>
                <div class="modal-input-block">
                    <label for="body">Содержание поста</label>
                    <textarea id="body" name="body" rows="8" required></textarea>
                </div>
                <div class="modal-btn-menu">
                    <input type="reset" id="reset-modal" class="modal-btn" value="Отмена">
                    <input type="submit" id="add-post-btn" class="modal-btn" value="Добавить">
                </div>
            </form>
        </dialog>
    `
}