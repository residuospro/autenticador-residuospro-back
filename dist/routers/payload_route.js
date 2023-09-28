"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payload_controller_1 = __importDefault(require("../controllers/payload_controller"));
const enum_1 = require("../utils/enum");
const payload_route = express_1.default.Router();
const payloadController = new payload_controller_1.default();
payload_route.get(enum_1.Routes.PAYLOAD, payloadController.payload);
exports.default = payload_route;
//# sourceMappingURL=payload_route.js.map