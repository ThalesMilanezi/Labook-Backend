"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendshipRouter = void 0;
const express_1 = __importDefault(require("express"));
const FriendshipController_1 = require("../controller/FriendshipController");
exports.friendshipRouter = express_1.default.Router();
const friendshipController = new FriendshipController_1.FriendshipController();
exports.friendshipRouter.post("/make", friendshipController.makeFriendship);
exports.friendshipRouter.delete("/undo", friendshipController.undoFriendship);
