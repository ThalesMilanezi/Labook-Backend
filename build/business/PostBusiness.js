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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBusiness = void 0;
const IdGenerator_1 = require("../services/IdGenerator");
const PostDatabase_1 = require("../data/PostDatabase");
const Post_1 = require("../model/Post");
const idGenerator = new IdGenerator_1.IdGenerator();
const postDatabase = new PostDatabase_1.PostDatabase();
class PostBusiness {
    createPost(image, description, creationDate, type, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = idGenerator.generatorId();
            const post = new Post_1.Post(id, image, description, creationDate, type, userId);
            return yield postDatabase.createPost(post);
        });
    }
    getFeed(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postDatabase.getFeed(id);
        });
    }
}
exports.PostBusiness = PostBusiness;
