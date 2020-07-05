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
exports.LikeDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class LikeDatabase extends BaseDatabase_1.BaseDatabase {
    verifyLike(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection().raw(`
        SELECT COUNT(*) as count 
        FROM LaBookLike
        WHERE user_id = "${userId}" AND post_id = "${postId}"
        `);
            return result[0][0].count;
        });
    }
    likePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection()
                .insert({
                user_id: userId,
                post_id: postId
            })
                .into(LikeDatabase.TABLE_NAME);
        });
    }
    unlikePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection()
                .delete()
                .from(LikeDatabase.TABLE_NAME)
                .where({
                user_id: userId,
                post_id: postId
            });
        });
    }
}
exports.LikeDatabase = LikeDatabase;
LikeDatabase.TABLE_NAME = "LaBookLike";
