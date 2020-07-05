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
exports.LikeBusiness = void 0;
const LikeDatabase_1 = require("../data/LikeDatabase");
const likeDatabase = new LikeDatabase_1.LikeDatabase();
class LikeBusiness {
    verifyLike(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield likeDatabase.verifyLike(userId, postId);
        });
    }
    likePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield likeDatabase.likePost(userId, postId);
        });
    }
    unlikePost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield likeDatabase.unlikePost(userId, postId);
        });
    }
}
exports.LikeBusiness = LikeBusiness;
