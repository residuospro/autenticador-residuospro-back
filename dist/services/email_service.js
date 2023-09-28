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
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailMsg_1 = require("../utils/emailMsg");
class EmailService {
    static sendEmail(recipient, service, userId, typeAction) {
        return __awaiter(this, void 0, void 0, function* () {
            const transportConfig = nodemailer_1.default.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: `${process.env.USER_PASS}#`,
                },
            });
            yield transportConfig
                .sendMail({
                from: `Aunteticador ${service} <${process.env.USER_EMAIL}>`,
                to: recipient,
                subject: "Cadastro de senha",
                html: (0, emailMsg_1.message)(userId, service, typeAction),
            })
                .then((res) => {
                return res;
            })
                .catch((error) => {
                return error;
            });
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=email_service.js.map