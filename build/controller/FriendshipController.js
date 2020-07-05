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
exports.FriendshipController = void 0;
const Authenticator_1 = require("../services/Authenticator");
const FriendshipDatabase_1 = require("../data/FriendshipDatabase");
const Friendship_1 = require("../model/Friendship");
const BaseDatabase_1 = require("../data/BaseDatabase");
const authenticator = new Authenticator_1.Authenticator();
const friendshipBusiness = new FriendshipDatabase_1.FriendshipDatabase();
class FriendshipController {
    makeFriendship(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const userToMakeFriendshipId = req.body.userToMakeFriendshipId;
                if (!userToMakeFriendshipId || userToMakeFriendshipId === "") {
                    throw new Error("Informe  um usúario que voce gostaria de ser amigo!");
                }
                const userData = authenticator.verify(token);
                const friendships = yield friendshipBusiness.getFriendshipById(userData.id);
                const userRelation = friendships.find((relation) => {
                    return relation.user_id === userToMakeFriendshipId || relation.user_to_make_friendship_id === userToMakeFriendshipId;
                });
                if (userRelation) {
                    throw new Error("Você já têm amizade com esse usuário");
                }
                const friendship = new Friendship_1.Friendship(userData.id, userToMakeFriendshipId);
                yield friendshipBusiness.makeFriendship(friendship);
                res.status(200).send({
                    message: "Parabens, voce tem um novo amigo !"
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
    undoFriendship(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { userUndoFriendshipId } = req.body;
                if (!userUndoFriendshipId || userUndoFriendshipId === "") {
                    throw new Error("Informe um usúario que voce gostaria de deixar de ser amigo!");
                }
                const userData = authenticator.verify(token);
                const friendships = yield friendshipBusiness.getFriendshipById(userData.id);
                const userRelation = friendships.find((relation) => {
                    return relation.user_id === userUndoFriendshipId || relation.user_to_make_friendship_id === userUndoFriendshipId;
                });
                if (userRelation === undefined) {
                    throw new Error("Você não tem amizade com esse usuário");
                }
                const friendship = new Friendship_1.Friendship(userData.id, userUndoFriendshipId);
                yield friendshipBusiness.undoFriendship(friendship);
                res.status(200).send({
                    message: "Você desfez a amizade!"
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
exports.FriendshipController = FriendshipController;
