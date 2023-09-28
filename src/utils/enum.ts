export enum Routes {
  SAVE_USER = "/api/user/save",
  SAVE_SUPPORT = "/api/support/save",
  UPDATE_USER = "/user/update/:id",
  REDEFINE_PASSWORD = "/api/redefine_password",
  CHANGE_PASSWORD = "/api/change_password/:id",
  CREATE_PASSWORD = "/api/create_password/:id",
  DELETE_USER = "/user/:id",

  GET_USERS = "/users",
  GET_USER_BY_USERNAME = "/user/by-username",
  GET_ALL_USERNAMES = "/user/all",

  LOGIN = "/api/login",
  PAYLOAD = "/api/payload",
  REFRESH_TOKEN = "/api/refresh_token",
  VERIFYTOKEN = "/api/verifyToken",
  USER_EXISTS = "/api/user_exists/:id",
}

export enum Permissions {
  SUPPORT = "SUPPORT",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COLLABORATOR = "COLLABORATOR",
}

export enum Service {
  SAVEMONEY = "SaveMoney",
  RESIDUOSPRO = "Residuos-Pro",
}

export enum Actions {
  CREATE = "create",
  UPDATE = "update",
}
