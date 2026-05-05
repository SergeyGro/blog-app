"use strict";

export default class Post {
    constructor(id, title, body){
        this.id = id,
        this.title = title,
        this.body = body
    }
    getPost() {
        const post = {
            postId: this.id,
            title: this.title,
            body: this.body
        }
        return post;
    }
}