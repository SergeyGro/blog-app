"use strict";

import Post from "./post.js";
import { addPost } from "../api.js";

export function openModal(){
  const modalBtn = document.getElementById('showModalBtn');
  const modal = document.getElementById('modal');
  modalBtn.addEventListener('click', () => {
    modal.showModal();
  })
}

export function closeModal(){
    const cancelBtn = document.getElementById('resetModal');
    cancelBtn.addEventListener('click', () => {
        modal.close(); 
    });
}

export async function createPost() {
    const btn = document.getElementById('addPostBtn');
    btn.addEventListener('click', () => {
        const postForm = document.forms.postForm;
        const post = new Post(postForm.title.value, postForm.body.value);
        addPost(post.getPost());
    })
}

export function getModal(){
    return `
        <dialog id="modal">
            <form method="dialog" name="postForm" class="modalForm">
                <div class="modalInputBlock">
                    <label for="title">Заголовок</label>
                    <input type="text" id="title" name="title" autofocus class="modalInput">
                </div>
                <div class="modalInputBlock">
                    <label for="body">Информация</label>
                    <input type="text" id="body" name="body" autofocus class="modalInput">
                </div>
                <div class="modalBtnMenu">
                    <input type="reset" id="resetModal" class="modalBtn" value="Отмена">
                    <input type="submit" id="addPostBtn" class="modalBtn" value="Добавить">
                </div>
            </form>
        </dialog>
    `
}