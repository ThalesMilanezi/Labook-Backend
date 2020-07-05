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
exports.UserBusiness = void 0;
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const UserDatabase_1 = require("../data/UserDatabase");
const User_1 = require("../model/User");
const idGenerator = new IdGenerator_1.IdGenerator();
const hashManager = new HashManager_1.HashManager();
const userDatabase = new UserDatabase_1.UserDatabase();
class UserBusiness {
    signup(email, name, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = idGenerator.generatorId();
            const hashPassword = yield hashManager.hash(password);
            const user = new User_1.User(id, email, name, hashPassword, role);
            yield userDatabase.createUser(user);
            return { id: id, role: role };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userDatabase.getUserByEmail(email);
            if (!user) {
                throw new Error("Parâmetros incorretos !"); // O usuário não existe 
            }
            const comparePasswords = yield hashManager.compare(password, user.getPassword());
            if (!comparePasswords) {
                throw new Error("Invalid Params");
            }
            return { id: user.getId(), role: user.getRole() };
        });
    }
}
exports.UserBusiness = UserBusiness;
