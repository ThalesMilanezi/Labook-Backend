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
exports.FriendshipDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Friendship_1 = require("../model/Friendship");
class FriendshipDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbResult) {
        return (dbResult && new Friendship_1.Friendship(dbResult.userId, dbResult.userToMakeFriendshipId));
    }
    makeFriendship(friendship) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection()
                .insert({
                user_id: friendship.getUserId(),
                user_to_make_friendship_id: friendship.getUserToMakeFriendshipId()
            })
                .into(FriendshipDatabase.TABLE_NAME);
        });
    }
    getFriendshipById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection()
                .select("*")
                .from(FriendshipDatabase.TABLE_NAME)
                .where({
                user_id: id
            })
                .orWhere({
                user_to_make_friendship_id: id
            });
            return result;
        });
    }
    undoFriendship(friendship) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendshipData = this.toModel(friendship);
            yield this.connection()
                .delete()
                .from(FriendshipDatabase.TABLE_NAME)
                .where({
                user_id: friendshipData === null || friendshipData === void 0 ? void 0 : friendshipData.getUserId(),
                user_to_make_friendship_id: friendshipData === null || friendshipData === void 0 ? void 0 : friendshipData.getUserToMakeFriendshipId()
            }).orWhere({
                user_id: friendshipData === null || friendshipData === void 0 ? void 0 : friendshipData.getUserToMakeFriendshipId(),
                user_to_make_friendship_id: friendshipData === null || friendshipData === void 0 ? void 0 : friendshipData.getUserId()
            });
        });
    }
}
exports.FriendshipDatabase = FriendshipDatabase;
FriendshipDatabase.TABLE_NAME = "LaBookUserFriendship";
