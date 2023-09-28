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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_service_1 = __importDefault(require("../services/token_service"));
class TokenController {
    createRefreshToken(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                const refresh_token = yield token_service_1.default.updateRefreshToken(token);
                return res.status(200).json(refresh_token);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    validatedToken(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                if (!token) {
                    res.status(401).json({ message: "Token não fornecido" });
                    return;
                }
                const validToken = token_service_1.default.verifyToken(token);
                return res.status(200).json(validToken);
            }
            catch (error) {
                return res.status(401).json({ message: "Token invalido" });
            }
        });
    }
}
exports.default = TokenController;
//# sourceMappingURL=token_controller.js.map