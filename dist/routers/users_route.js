"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const user_controllers_1 = __importDefault(require("../controllers/user_controllers"));
const middleware_1 = require("../middleware");
const userSchema_1 = require("../middleware/schemas/userSchema");
const enum_2 = require("../utils/enum");
const user_route = express_1.default.Router();
const user_controller = new user_controllers_1.default();
user_route
    .post(enum_1.Routes.GET_USERS, userSchema_1.getUserByRoleSchema, middleware_1.validRequest, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([
    enum_2.Permissions.SUPPORT,
    enum_2.Permissions.ADMIN,
    enum_2.Permissions.MANAGER,
]), user_controller.getUsersByRole)
    .post(enum_1.Routes.GET_USER_BY_USERNAME, userSchema_1.getUsernameSchema, middleware_1.validRequest, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([
    enum_2.Permissions.SUPPORT,
    enum_2.Permissions.ADMIN,
    enum_2.Permissions.MANAGER,
]), user_controller.getUserByUsername)
    .post(enum_1.Routes.GET_ALL_USERNAMES, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([
    enum_2.Permissions.SUPPORT,
    enum_2.Permissions.ADMIN,
    enum_2.Permissions.MANAGER,
]), user_controller.getAllUsernames)
    .post(enum_1.Routes.SAVE_USER, userSchema_1.userCreateSchema, middleware_1.validRequest, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([
    enum_2.Permissions.SUPPORT,
    enum_2.Permissions.ADMIN,
    enum_2.Permissions.MANAGER,
]), user_controller.createUser)
    .post(enum_1.Routes.SAVE_SUPPORT, user_controller.createUser)
    .post(enum_1.Routes.USER_EXISTS, user_controller.validateUsername)
    .put(enum_1.Routes.CREATE_PASSWORD, user_controller.finalizeRegistration)
    .put(enum_1.Routes.UPDATE_USER, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([
    enum_2.Permissions.SUPPORT,
    enum_2.Permissions.ADMIN,
    enum_2.Permissions.MANAGER,
]), user_controller.updateUsers)
    .delete(enum_1.Routes.DELETE_USER, middleware_1.verifyToken, (0, middleware_1.verifyPermission)([
    enum_2.Permissions.SUPPORT,
    enum_2.Permissions.ADMIN,
    enum_2.Permissions.MANAGER,
]), user_controller.deleteUsers);
exports.default = user_route;
//# sourceMappingURL=users_route.js.map