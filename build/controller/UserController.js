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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const Authenticator_1 = require("../services/Authenticator");
const RefreshTokenDatabase_1 = require("../data/RefreshTokenDatabase");
const BaseDatabase_1 = require("../data/BaseDatabase");
const userBusiness = new UserBusiness_1.UserBusiness();
const authenticator = new Authenticator_1.Authenticator();
const refreshTokenDatabase = new RefreshTokenDatabase_1.RefreshTokenDatabase();
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password, role, device } = req.body;
                if (!email || email === "" ||
                    !name || name === "" ||
                    !password || password === "" ||
                    !device || device === "") {
                    throw new Error("Parâmetros Inválidos");
                }
                if (password.length < 6) {
                    throw new Error("A senha deverá ter no mínimo 6 caracteres");
                }
                if (email.indexOf("@") === -1) {
                    throw new Error("Email inválido");
                }
                const result = yield userBusiness.signup(email, name, password, role);
                const acessToken = authenticator.generationToken({
                    id: result.id,
                    role: result.role
                }, process.env.ACCESS_TOKEN_EXPIRES_IN);
                const refreshToken = authenticator.generationToken({
                    id: result.id,
                    device
                }, process.env.REFRESH_TOKEN_EXPIRES_IN);
                yield refreshTokenDatabase.createRefreshToken(refreshToken, device, true, result.id);
                res.status(200).send({
                    acessToken,
                    refreshToken
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
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, device } = req.body;
                if (!email || email === "" ||
                    !password || password === "" ||
                    !device || device === "") {
                    throw new Error("Parâmetros Inválidos");
                }
                const result = yield userBusiness.login(email, password);
                const acessToken = authenticator.generationToken({
                    id: result.id,
                    role: result.role
                }, process.env.ACCESS_TOKEN_EXPIRES_IN);
                const refreshToken = authenticator.generationToken({
                    id: result.id,
                    device
                }, process.env.REFRESH_TOKEN_EXPIRES_IN);
                const refreshTokenFromDb = yield refreshTokenDatabase
                    .getRefreshTokenByUserIdAndDevice(result.id, device);
                if (refreshTokenFromDb !== undefined) {
                    yield refreshTokenDatabase.deleteRefreshToken(refreshTokenFromDb.refreshToken);
                }
                yield refreshTokenDatabase.createRefreshToken(refreshToken, device, true, result.id);
                res.status(200).send({
                    acessToken,
                    refreshToken
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
    refreshAcessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken, device } = req.body;
                const refreshTokenData = authenticator.verify(refreshToken);
                if (refreshTokenData.device !== device) {
                    throw new Error("Esse aparelho não está autenticado!");
                }
                const acessToken = authenticator.generationToken({
                    id: refreshTokenData.id,
                    role: refreshTokenData.role
                }, process.env.ACCESS_TOKEN_EXPIRES_IN);
                res.status(200).send({ acessToken });
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
exports.UserController = UserController;
