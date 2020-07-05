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
exports.CommentController = void 0;
const Authenticator_1 = require("../services/Authenticator");
const CommentBusiness_1 = require("../business/CommentBusiness");
const BaseDatabase_1 = require("../data/BaseDatabase");
const authenticator = new Authenticator_1.Authenticator();
const commentBusiness = new CommentBusiness_1.CommentBusiness();
class CommentController {
    commentPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { comment, postId } = req.body;
                if (postId === undefined || postId === "") {
                    throw new Error("Informe um post para comentar.");
                }
                if (comment === undefined || comment === "") {
                    throw new Error("O comentário não pode ficar vazio.");
                }
                if (token === undefined || token === "") {
                    throw new Error("O usuário deve estar logado.");
                }
                const userId = authenticator.verify(token).id;
                yield commentBusiness.commentPost(comment, userId, postId);
                res.status(200).send({
                    message: "Comentário criado com sucesso !"
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
exports.CommentController = CommentController;
