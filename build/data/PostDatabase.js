"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const moment_1 = __importDefault(require("moment"));
const Post_1 = require("../model/Post");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection()
                .insert({
                id: post.getId(),
                image: post.getImage(),
                description: post.getDescription(),
                creation_date: post.getCreationDate(),
                type: post.getType(),
                user_id: post.getUserId()
            })
                .into(PostDatabase.TABLE_NAME);
        });
    }
    getFeed(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection().raw(`
      SELECT
        p.id as post_id,
        p.image,
        p.description,
        p.creation_date,
        p.type,
        p.user_id,
        u.name
      FROM LaBookPost p
      JOIN LaBookUser u ON p.user_id = u.id
      JOIN LaBookUserFriendship f ON p.user_id = f.user_to_make_friendship_id OR p.user_id = f.user_id
      WHERE (f.user_id = "${id}" OR f.user_to_make_friendship_id = "${id}") AND p.user_id <> "${id}"
      ORDER BY creation_date DESC
    `);
            const feed = [];
            for (const item of result[0]) {
                const creationDateFormated = moment_1.default(item.creation_date).format("DD/MM/YYYY");
                const newPost = new Post_1.PostOutput(item.post_id, item.image, item.description, creationDateFormated, item.type, item.name, item.user_id);
                feed.push(newPost);
            }
            return feed;
        });
    }
}
exports.PostDatabase = PostDatabase;
PostDatabase.TABLE_NAME = "LaBookPost";
