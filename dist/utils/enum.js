"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = exports.Service = exports.Permissions = exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["SAVE_USER"] = "/api/user/save";
    Routes["SAVE_SUPPORT"] = "/api/support/save";
    Routes["UPDATE_USER"] = "/user/update/:id";
    Routes["REDEFINE_PASSWORD"] = "/api/redefine_password";
    Routes["CHANGE_PASSWORD"] = "/api/change_password/:id";
    Routes["CREATE_PASSWORD"] = "/api/create_password/:id";
    Routes["DELETE_USER"] = "/user/:id";
    Routes["GET_USERS"] = "/users";
    Routes["GET_USER_BY_USERNAME"] = "/user/by-username";
    Routes["GET_ALL_USERNAMES"] = "/user/all";
    Routes["LOGIN"] = "/api/login";
    Routes["PAYLOAD"] = "/api/payload";
    Routes["REFRESH_TOKEN"] = "/api/refresh_token";
    Routes["VERIFYTOKEN"] = "/api/verifyToken";
    Routes["USER_EXISTS"] = "/api/user_exists/:id";
})(Routes = exports.Routes || (exports.Routes = {}));
var Permissions;
(function (Permissions) {
    Permissions["SUPPORT"] = "SUPPORT";
    Permissions["ADMIN"] = "ADMIN";
    Permissions["MANAGER"] = "MANAGER";
    Permissions["COLLABORATOR"] = "COLLABORATOR";
})(Permissions = exports.Permissions || (exports.Permissions = {}));
var Service;
(function (Service) {
    Service["SAVEMONEY"] = "SaveMoney";
    Service["RESIDUOSPRO"] = "Residuos-Pro";
})(Service = exports.Service || (exports.Service = {}));
var Actions;
(function (Actions) {
    Actions["CREATE"] = "create";
    Actions["UPDATE"] = "update";
})(Actions = exports.Actions || (exports.Actions = {}));
//# sourceMappingURL=enum.js.map