"use strict";

export default class Post {
    constructor(title, body){
        this.title = title,
        this.body = body
    }
    getPost() {
        const post = {
            title: this.title,
            body: this.body
        }
        return post;
    }
}