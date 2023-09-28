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
const auth_service_1 = __importDefault(require("../services/auth_service"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authService = new auth_service_1.default();
            const authHeader = req.headers.authorization;
            const credentials = authService.parseCredentials(authHeader);
            if (!credentials) {
                return res.status(401).send({ message: "Credenciais inválidas" });
            }
            const { username, password } = credentials;
            const user = yield authService.findUserByUsername(username);
            if (!user) {
                return res.status(403).json({ error: "Usuário não encontrado" });
            }
            const passwordMatch = yield authService.comparePasswords(password, user.password);
            if (!passwordMatch) {
                return res.status(403).json({ error: "Senha incorreta" });
            }
            const { token, refreshToken } = yield authService.generateTokens(user);
            res.status(200).json({ token, refreshToken, permission: user.role });
        });
    }
}
exports.default = LoginController;
//# sourceMappingURL=login_controllers.js.map