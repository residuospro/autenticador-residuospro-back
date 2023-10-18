"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = exports.Actions = exports.Service = exports.Permissions = exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["SAVE_USER"] = "/api/user/save";
    Routes["SAVE_SUPPORT"] = "/api/support/save";
    Routes["UPDATE_USER"] = "/user/update/:id";
    Routes["REDEFINE_PASSWORD"] = "/api/redefine_password";
    Routes["CHANGE_PASSWORD"] = "/api/change_password/:id";
    Routes["CREATE_PASSWORD"] = "/api/create_password/:id";
    Routes["DELETE_USER"] = "/user/:id";
    Routes["UPDATE_USER_AFTER_DEPARTMENT"] = "/api/update/user_by_department";
    Routes["DELETE_USER_AFTER_DEPARTMENT"] = "/api/delete/user_by_department/:id";
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
var Messages;
(function (Messages) {
    Messages["TITLE_REGISTER"] = "Cadastrado";
    Messages["SUBTITLE_REGISTER"] = "Cadastro realizado com sucesso";
    Messages["TITLE_ERROR_REGISTER"] = "Erro ao cadastrar";
    Messages["SUBTITLE_ERROR_REGISTER"] = "Houve um erro inesperado no cadastro";
    Messages["TITLE_ERROR"] = "Houve um erro inesperado";
    Messages["SUBTITLE_ERROR"] = "Tivemos um erro em nosso servidor, por favor tente novamente";
    Messages["TITLE_DELETE_REGISTER"] = "Deletado";
    Messages["SUBTITLE_DELETE_REGISTER"] = "Registro deletado com sucesso";
    Messages["TITLE_ERROR_DELETE_REGISTER"] = "Erro ao deletar";
    Messages["SUBTITLE_ERROR_DELETE_REGISTER"] = "Houve um erro inesperado ao deletar";
    Messages["TITLE_UPDATE_REGISTER"] = "Atualizado";
    Messages["SUBTITLE_UPDATE_REGISTER"] = "Registro atualizazdo com sucesso";
    Messages["TITLE_ERROR_UPDATE_REGISTER"] = "Erro ao atualizar";
    Messages["SUBTITLE_ERROR_UPDATE_REGISTER"] = "Houve um erro inesperado ao atualizar";
    Messages["SUBTITLE_EXISTENT_DEPARTMENT"] = "O departamento que voc\u00EA est\u00E1 tentando criar j\u00E1 existe em nosso banco";
    Messages["SUBTITLE_ERROR_UPDATE_DEPARTMENT"] = "Esse nome de departamento j\u00E1 existe em nosso banco";
    Messages["TITLE_THERE_ARE_NO_RECORDS"] = "N\u00E3o h\u00E1 registros";
    Messages["SUBTITLE_THERE_ARE_NO_RECORDS"] = "N\u00E3o foram encontrados registros para essa busca";
    Messages["TITLE_EXISTING_USER"] = "Username inv\u00E1lido";
    Messages["SUBTITLE_EXISTING_USER"] = "O nome de usu\u00E1rio fornecido j\u00E1 existe em nosso banco";
})(Messages = exports.Messages || (exports.Messages = {}));
//# sourceMappingURL=enum.js.map