"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const token_controller_1 = __importDefault(require("../controllers/token_controller"));
const verifyToen_route = express_1.default.Router();
const token_controller = new token_controller_1.default();
verifyToen_route.post(enum_1.Routes.VERIFYTOKEN, token_controller.validatedToken);
exports.default = verifyToen_route;
//# sourceMappingURL=verifytoken_route.js.map