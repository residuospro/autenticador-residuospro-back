"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.cacheControlMiddleware = exports.verifyPermission = exports.verifyToken = exports.validRequest = void 0;
const express_validator_1 = require("express-validator");
const token_service_1 = __importDefault(require("../services/token_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const validRequest = (req, res, next) => {
    const myValidationResult = express_validator_1.validationResult.withDefaults({
        formatter: (error) => {
            return {
                location: error.location,
                msg: error.msg,
                param: error.param,
                nestedErrors: error.nestedErrors,
            };
        },
    });
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.validRequest = validRequest;
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "Token não fornecido" });
            return;
        }
        const validToken = token_service_1.default.verifyToken(token);
        if (validToken) {
            req.token = token;
            req.user = validToken;
            next();
        }
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};
exports.verifyToken = verifyToken;
const verifyPermission = (permission) => {
    return (req, res, next) => {
        const user = req.user;
        if (permission.includes(user.role[0])) {
            next();
        }
        else {
            return res.status(401).send({
                message: "Você não possui permissão",
            });
        }
    };
};
exports.verifyPermission = verifyPermission;
const cacheControlMiddleware = (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
};
exports.cacheControlMiddleware = cacheControlMiddleware;
const errorHandler = (req, res, error) => {
    if (error instanceof handleError_1.default) {
        return res.status(error.statusCode).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=index.js.map