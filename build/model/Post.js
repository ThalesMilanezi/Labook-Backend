"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostOutput = exports.Post = void 0;
class Post {
    constructor(id, image, description, creationDate, type, userId) {
        this.id = id;
        this.image = image;
        this.description = description;
        this.creationDate = creationDate;
        this.type = type;
        this.userId = userId;
    }
    getId() {
        return this.id;
    }
    getImage() {
        return this.image;
    }
    getDescription() {
        return this.description;
    }
    getCreationDate() {
        return this.creationDate;
    }
    getType() {
        return this.type;
    }
    getUserId() {
        return this.userId;
    }
}
exports.Post = Post;
class PostOutput {
    constructor(postId, image, description, creationDate, type, name, userId) {
        this.postId = postId;
        this.image = image;
        this.description = description;
        this.creationDate = creationDate;
        this.type = type;
        this.name = name;
        this.userId = userId;
    }
}
exports.PostOutput = PostOutput;
