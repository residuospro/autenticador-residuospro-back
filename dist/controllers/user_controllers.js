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
const user_service_1 = __importDefault(require("../services/user_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const passwordGenerator_1 = __importDefault(require("../utils/passwordGenerator"));
const enum_1 = require("../utils/enum");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idDepartment, department, idCompany, role, ramal, email, service, } = req.body;
                const user = req.user;
                const generator = new passwordGenerator_1.default();
                const password = generator.generateRandomPassword();
                const createUser = yield user_service_1.default.createUser({
                    name,
                    idDepartment,
                    department,
                    idCompany,
                    role,
                    ramal,
                    password,
                    email,
                    service,
                }, user.permission[0]);
                return res.status(201).json(createUser);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getUsersByRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, itemsPerPage, role, idCompany, idDepartment } = req.body;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const users = yield user_service_1.default.getUsers(role, skip, itemsPerPage, idCompany, idDepartment);
                return res.status(200).json(users);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getAllUsernames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCompany, role, idDepartment } = req.body;
                const users = yield user_service_1.default.getAllUsernamesService(idCompany, role, idDepartment);
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getUserByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, idCompany, role } = req.body;
                const user = yield user_service_1.default.getUsername({
                    username,
                    idCompany,
                    role,
                });
                if (user) {
                    return res.status(200).json(user);
                }
                return res.status(404).send({ message: "Usuário não encontrado" });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    validateUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                const { id } = req.params;
                const existingUsername = yield user_service_1.default.validateUsernameService(username, id);
                return res.status(200).json(existingUsername);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    finalizeRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, service } = req.body;
                const { id } = req.params;
                yield user_service_1.default.finalizeRegistrationService([{ username, password }], id);
                if (service == enum_1.Service.RESIDUOSPRO) {
                    let url = process.env.RESIDUOS_SERVICE;
                    return res.status(200).send(url);
                }
                return res.status(204).send("Senha redefinida com sucesso");
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    updateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, username, password, ramal, email, department, idDepartment, } = req.body;
                const { id } = req.params;
                const user = yield user_service_1.default.updateUser([{ name, username, password, ramal, email, department, idDepartment }], id);
                return res.status(200).json(user);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(404).send({ message: error.message });
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.default.deleteUser(id);
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user_controllers.js.map