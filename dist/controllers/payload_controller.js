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
class PayloadController {
    payload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.token;
            const user = yield token_service_1.default.decodedTokenService(token);
            if (!user) {
                res.status(401).send({ message: "Token inválido" });
            }
            return res.status(200).json(user);
        });
    }
}
exports.default = PayloadController;
//# sourceMappingURL=payload_controller.js.map