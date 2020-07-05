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
exports.PostController = void 0;
const PostBusiness_1 = require("../business/PostBusiness");
const Authenticator_1 = require("../services/Authenticator");
const BaseDatabase_1 = require("../data/BaseDatabase");
const authenticator = new Authenticator_1.Authenticator();
const postBusiness = new PostBusiness_1.PostBusiness();
class PostController {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image, description, type } = req.body;
                if (description === undefined ||
                    image === undefined ||
                    (description === "" && image === "")) {
                    throw new Error("Parâmetro inválido");
                }
                const token = req.headers.authorization;
                const date = new Date();
                const userData = authenticator.verify(token);
                yield postBusiness.createPost(image, description, date, type, userData.id);
                res.status(200).send({
                    message: "Post criado com sucesso !"
                });
            }
            catch (err) {
                res.status(400).send({
                    error: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    getFeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const userData = authenticator.verify(token);
                const feed = yield postBusiness.getFeed(userData.id);
                res.status(200).send({
                    feed
                });
            }
            catch (err) {
                res.status(400).send({
                    error: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    getFeedByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { type } = req.body;
                const userData = authenticator.verify(token);
                const feed = yield postBusiness.getFeed(userData.id);
                const filteredFeed = feed.filter(post => post.type === type);
                res.status(200).send({
                    feed: filteredFeed
                });
            }
            catch (err) {
                res.status(400).send({
                    error: err.message
                });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.PostController = PostController;
