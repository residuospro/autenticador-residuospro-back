"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_route_1 = __importDefault(require("./users_route"));
const middleware_1 = require("../middleware");
const login_route_1 = __importDefault(require("./login_route"));
const payload_route_1 = __importDefault(require("./payload_route"));
const refreshToken_route_1 = __importDefault(require("./refreshToken_route"));
const verifytoken_route_1 = __importDefault(require("./verifytoken_route"));
const permissions_1 = require("../utils/permissions");
const router = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Autenticador ativo");
    });
    app.use(express_1.default.json(), (0, cors_1.default)(), middleware_1.cacheControlMiddleware, login_route_1.default, verifytoken_route_1.default, refreshToken_route_1.default, users_route_1.default, middleware_1.verifyToken, (0, middleware_1.verifyPermission)(permissions_1.typePermissions), payload_route_1.default, middleware_1.errorHandler);
};
exports.default = router;
//# sourceMappingURL=index.js.map