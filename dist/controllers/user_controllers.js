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
                }, user.role[0]);
                return res.status(201).json({
                    createUser,
                    message: {
                        title: enum_1.Messages.TITLE_REGISTER,
                        subTitle: enum_1.Messages.SUBTITLE_REGISTER,
                    },
                });
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({
                        message: {
                            title: enum_1.Messages.TITLE_EXISTING_USER,
                            subTitle: enum_1.Messages.SUBTITLE_EXISTING_USER,
                        },
                    });
                }
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
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
                    return res.status(error.statusCode).send({
                        message: {
                            title: enum_1.Messages.TITLE_THERE_ARE_NO_RECORDS,
                            subTitle: enum_1.Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
                        },
                    });
                }
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
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
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
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
                return res.status(500).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
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
                return res.status(200).json({
                    user,
                    message: {
                        title: enum_1.Messages.TITLE_UPDATE_REGISTER,
                        subTitle: enum_1.Messages.SUBTITLE_UPDATE_REGISTER,
                    },
                });
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({
                        message: {
                            title: enum_1.Messages.TITLE_EXISTING_USER,
                            subTitle: enum_1.Messages.SUBTITLE_EXISTING_USER,
                        },
                    });
                }
                return res.status(404).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR_UPDATE_REGISTER,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR_UPDATE_REGISTER,
                    },
                });
            }
        });
    }
    updateUserAfterUpdateDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, ramal, idDepartment } = req.body;
            yield user_service_1.default.updateUserAfterUpdateDepartmentService(name, ramal, idDepartment);
            return res
                .status(204)
                .json("Todos os usuários desse departamento foram atualizados");
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.default.deleteUser(id);
                return res.status(200).json({
                    message: {
                        title: enum_1.Messages.TITLE_DELETE_REGISTER,
                        subTitle: enum_1.Messages.SUBTITLE_DELETE_REGISTER,
                    },
                });
            }
            catch (error) {
                return res.status(404).send({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR_DELETE_REGISTER,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR_DELETE_REGISTER,
                    },
                });
            }
        });
    }
    deleteUserAfterDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield user_service_1.default.deleteUserAfterDepartmentService(id);
            return res.status(204).json("Todos os usuário foram deletados");
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user_controllers.js.map