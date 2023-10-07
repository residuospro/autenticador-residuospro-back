import express from "express";
import { Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest, verifyToken, verifyPermission } from "../middleware";
import {
  userCreateSchema,
  getUserByRoleSchema,
  getUsernameSchema,
} from "../middleware/schemas/userSchema";
import { Permissions } from "../utils/enum";

const user_route = express.Router();
const user_controller = new UserController();

user_route
  .post(
    Routes.GET_USERS,
    getUserByRoleSchema,
    validRequest,
    verifyToken,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.getUsersByRole
  )
  .post(
    Routes.GET_USER_BY_USERNAME,
    getUsernameSchema,
    validRequest,
    verifyToken,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.getUserByUsername
  )
  .post(
    Routes.GET_ALL_USERNAMES,
    verifyToken,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.getAllUsernames
  )
  .post(
    Routes.SAVE_USER,
    userCreateSchema,
    validRequest,
    verifyToken,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.createUser
  )
  .post(Routes.SAVE_SUPPORT, user_controller.createUser)
  .post(Routes.USER_EXISTS, user_controller.validateUsername)
  .post(
    Routes.UPDATE_USER_AFTER_DEPARTMENT,
    verifyToken,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.updateUserAfterUpdateDepartment
  )
  .put(Routes.CREATE_PASSWORD, user_controller.finalizeRegistration)
  .put(
    Routes.UPDATE_USER,
    verifyToken,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.updateUsers
  )
  .delete(
    Routes.DELETE_USER,
    verifyToken,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.deleteUsers
  )
  .delete(
    Routes.DELETE_USER_AFTER_DEPARTMENT,
    verifyToken,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.deleteUserAfterDepartment
  );

export default user_route;
