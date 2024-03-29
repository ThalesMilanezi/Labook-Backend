"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../controller/PostController");
const LikeController_1 = require("../controller/LikeController");
const CommentController_1 = require("../controller/CommentController");
exports.postRouter = express_1.default.Router();
const postController = new PostController_1.PostController();
const likeController = new LikeController_1.LikeController();
const commentController = new CommentController_1.CommentController();
exports.postRouter.get("/feed", postController.getFeed);
exports.postRouter.get("/feed-type", postController.getFeedByType);
exports.postRouter.post("/create", postController.createPost);
exports.postRouter.post("/comment", commentController.commentPost);
exports.postRouter.post("/like", likeController.likePost);
exports.postRouter.delete("/unlike", likeController.unlikePost);
