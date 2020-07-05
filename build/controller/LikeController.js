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
exports.LikeController = void 0;
const Authenticator_1 = require("../services/Authenticator");
const LikeBusiness_1 = require("../business/LikeBusiness");
const BaseDatabase_1 = require("../data/BaseDatabase");
const authenticator = new Authenticator_1.Authenticator();
const likeBusiness = new LikeBusiness_1.LikeBusiness();
class LikeController {
    likePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId } = req.body;
                if (postId === undefined || postId === "") {
                    throw new Error("Informe poste para curtir.");
                }
                if (token === undefined || token === "") {
                    throw new Error("O usuário deve estar logado.");
                }
                const userId = authenticator.verify(token).id;
                const verifyLike = yield likeBusiness.verifyLike(userId, postId);
                if (verifyLike !== 0) {
                    throw new Error("Você não pode curtir este post novamente");
                }
                yield likeBusiness.likePost(userId, postId);
                res.status(200).send({
                    message: "Post curtido com sucesso!"
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
    unlikePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { postId } = req.body;
                if (postId === undefined || postId === "") {
                    throw new Error("Informe poste para descurtir.");
                }
                if (token === undefined || token === "") {
                    throw new Error("O usuário deve estar logado.");
                }
                const userId = authenticator.verify(token).id;
                const verifyLike = yield likeBusiness.verifyLike(userId, postId);
                if (verifyLike === 0) {
                    throw new Error("Você não pode descurtir um post que você não curtiu!");
                }
                yield likeBusiness.unlikePost(userId, postId);
                res.status(200).send({
                    message: "Post descurtido com sucesso!"
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
exports.LikeController = LikeController;
