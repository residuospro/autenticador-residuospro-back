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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const enum_1 = require("../utils/enum");
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const mapPermission_1 = __importDefault(require("../utils/errors/mapPermission"));
const email_service_1 = __importDefault(require("./email_service"));
const mongoose_1 = __importDefault(require("mongoose"));
class UserService {
    static createUser(userData, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                const { service, email } = userData;
                const saltRounds = 8;
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
                userData.password = hashedPassword;
                userData.role = mapPermission_1.default.getCreatablePermission(permission);
                const newUser = new users_1.default(Object.assign({}, userData));
                const savedUser = yield newUser.save({ session });
                if (savedUser) {
                    yield email_service_1.default.sendEmail(email, service, savedUser.id, enum_1.Actions.CREATE);
                }
                yield session.commitTransaction();
                session.endSession();
                return savedUser;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getUsers(role, skip, itemsPerPage, idCompany, idDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { role: { $in: [role] }, deleted: false };
                if (idCompany) {
                    query["idCompany"] = idCompany;
                }
                if (idDepartment) {
                    query["idDepartment"] = idDepartment;
                }
                const users = yield users_1.default.find(query).skip(skip).limit(itemsPerPage);
                if (users.length == 0) {
                    throw new handleError_1.default("Não há registros para essa busca", 404);
                }
                const totalUsers = yield users_1.default.find(query).count();
                const totalPages = Math.ceil(totalUsers / itemsPerPage);
                return { users, totalPages };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static validateUsernameService(username, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_1.default.findById(id, { deleted: false });
                const idCompany = user.idCompany;
                const existingUsername = yield users_1.default.findOne({
                    username,
                    idCompany,
                    deleted: false,
                });
                if (existingUsername != null) {
                    throw new handleError_1.default("Nome de usuário já existe", 409);
                }
                return null;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getUsername(users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, idCompany, role } = users;
                let query = {
                    username,
                    idCompany,
                    role: { $in: [role] },
                    deleted: false,
                };
                const user = yield users_1.default.findOne(query);
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getAllUsernamesService(idCompany, role, idDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {
                    idCompany,
                    role: { $in: [role] },
                    deleted: false,
                };
                if (idDepartment) {
                    query = Object.assign(Object.assign({}, query), { idDepartment });
                }
                const users = yield users_1.default.find(query);
                return users;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static finalizeRegistrationService(updatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                if (id) {
                    user = yield users_1.default.findById(id, { deleted: false });
                }
                else {
                    user = yield users_1.default.findOne({
                        username: updatedData[0].username,
                        deleted: false,
                    });
                }
                if (user == null) {
                    throw new handleError_1.default("Username não encontrado", 404);
                }
                const saltRounds = 8;
                const hashedPassword = yield bcrypt_1.default.hash(updatedData[0].password, saltRounds);
                user.password = hashedPassword;
                user.username = updatedData[0].username;
                yield user.save();
                return true;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error("Usuário não encontrado");
            }
        });
    }
    static updateUser(updatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let existingUser;
                if (updatedData[0].username) {
                    existingUser = yield users_1.default.findOne({
                        username: updatedData[0].username,
                        deleted: false,
                    });
                }
                if (existingUser != null) {
                    throw new handleError_1.default("Nome de usuário já existe", 409);
                }
                let user = (yield users_1.default.findById(id));
                for (const key in updatedData[0]) {
                    const value = updatedData[0][key];
                    if (value) {
                        user[key] = value;
                    }
                }
                const updatedUser = yield user.save();
                return updatedUser;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error("Usuário não encontrado");
            }
        });
    }
    static updateUserAfterUpdateDepartmentService(name, ramal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (name) {
                    yield users_1.default.updateMany({ idDepartment: id }, {
                        department: name,
                    });
                }
                if (ramal) {
                    yield users_1.default.updateMany({ idDepartment: id }, {
                        ramal,
                    });
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const user = yield users_1.default.findByIdAndUpdate(userId, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
                return user;
            }
            catch (error) {
                throw new Error("Usuário não encontrado");
            }
        });
    }
    static deleteUserAfterDepartmentService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield users_1.default.updateMany({ idDepartment: id }, { deleted: true, deletedAt: new Date() });
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user_service.js.map