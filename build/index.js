"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = require("./router/UserRouter");
const FriendshipRouter_1 = require("./router/FriendshipRouter");
const PostRouter_1 = require("./router/PostRouter");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/friendship/", FriendshipRouter_1.friendshipRouter);
app.use("/post", PostRouter_1.postRouter);
app.use("/", UserRouter_1.userRouter);
exports.default = app;
