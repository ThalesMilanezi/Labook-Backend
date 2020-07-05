"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friendship = void 0;
class Friendship {
    constructor(userId, userToMakeFriendshipId) {
        this.userId = userId;
        this.userToMakeFriendshipId = userToMakeFriendshipId;
    }
    getUserId() {
        return this.userId;
    }
    getUserToMakeFriendshipId() {
        return this.userToMakeFriendshipId;
    }
}
exports.Friendship = Friendship;
