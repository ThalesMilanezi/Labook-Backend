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
exports.RefreshTokenDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class RefreshTokenDatabase extends BaseDatabase_1.BaseDatabase {
    // PARA O SIGNUP
    createRefreshToken(refreshToken, device, isActive, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection()
                .insert({
                refresh_token: refreshToken,
                device,
                is_active: this.convertBooleanToTinyint(isActive),
                user_id: userId
            })
                .into(RefreshTokenDatabase.TABLE_NAME);
        });
    }
    getRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection()
                .select("*")
                .from(RefreshTokenDatabase.TABLE_NAME)
                .where({
                refresh_token: refreshToken
            });
            return {
                refreshToken: result[0].refresh_token,
                device: result[0].device,
                userId: result[0].user_id,
                isActive: this.convertTinyintToBoolean(result[0].is_active)
            };
        });
    }
    // PARA O LOGIN
    getRefreshTokenByUserIdAndDevice(userId, device) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection()
                .select("*")
                .from(RefreshTokenDatabase.TABLE_NAME)
                .where({
                user_id: userId,
                device
            });
            return result[0] && {
                refreshToken: result[0].refresh_token,
                device: result[0].device,
                userId: result[0].user_id,
                isActive: this.convertTinyintToBoolean(result[0].is_active)
            };
        });
    }
    deleteRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection()
                .delete()
                .from(RefreshTokenDatabase.TABLE_NAME)
                .where({
                refresh_token: refreshToken
            });
        });
    }
}
exports.RefreshTokenDatabase = RefreshTokenDatabase;
RefreshTokenDatabase.TABLE_NAME = "LaBookRefreshToken2";
