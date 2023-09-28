"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_controller_1 = __importDefault(require("../controllers/token_controller"));
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const refresh_token_route = express_1.default.Router();
const refresh_token_controller = new token_controller_1.default();
refresh_token_route.post(enum_1.Routes.REFRESH_TOKEN, refresh_token_controller.createRefreshToken);
exports.default = refresh_token_route;
//# sourceMappingURL=refreshToken_route.js.map