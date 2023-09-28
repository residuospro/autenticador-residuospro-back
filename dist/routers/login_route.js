"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const login_controllers_1 = __importDefault(require("../controllers/login_controllers"));
const login_route = express_1.default.Router();
const loginController = new login_controllers_1.default();
login_route.post(enum_1.Routes.LOGIN, loginController.login);
exports.default = login_route;
//# sourceMappingURL=login_route.js.map