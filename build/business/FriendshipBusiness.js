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
exports.FriendshipBusiness = void 0;
const FriendshipDatabase_1 = require("../data/FriendshipDatabase");
const Friendship_1 = require("../model/Friendship");
const friendshipDatabase = new FriendshipDatabase_1.FriendshipDatabase();
class FriendshipBusiness {
    makeFriendship(userId, userToMakeFriendshipId) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendship = new Friendship_1.Friendship(userId, userToMakeFriendshipId);
            const result = yield friendshipDatabase.makeFriendship(friendship);
            return result;
        });
    }
    undoFriendship(userId, userUndoFriendshipId) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendship = new Friendship_1.Friendship(userId, userUndoFriendshipId);
            const result = yield friendshipDatabase.undoFriendship(friendship);
            return result;
        });
    }
}
exports.FriendshipBusiness = FriendshipBusiness;
