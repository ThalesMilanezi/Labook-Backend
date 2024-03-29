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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../model/User");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbResult) {
        return (dbResult && new User_1.User(dbResult.id, dbResult.email, dbResult.name, dbResult.password, dbResult.role));
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection()
                .insert({
                id: user.getId(),
                email: user.getEmail(),
                name: user.getName(),
                password: user.getPassword(),
                role: user.getRole()
            })
                .into(UserDatabase.TABLE_NAME);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection()
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ email });
            return this.toModel(result[0]);
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = 'LaBookUser';
