import express from "express";
import { Routes, Event } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest } from "../middleware";
import {
  userCreateSchema,
  getUserByRoleSchema,
  getUsernameSchema,
} from "../middleware/schemas/userSchema";
import { Request, Response } from "express";
import WebSocketService from "../services/webSocketService";

const user_route = express.Router();
const user_controller = new UserController();

user_route
  .post(
    Routes.GET_USERS,
    getUserByRoleSchema,
    validRequest,
    user_controller.getUsersByRole
  )
  .post(
    Routes.GET_USER_BY_USERNAME,
    getUsernameSchema,
    validRequest,
    user_controller.getUserByUsername
  )
  .post(Routes.GET_ALL_USERNAMES, user_controller.getAllUsernames)

  .post(
    Routes.SAVE_USER,
    userCreateSchema,
    validRequest,
    async (req: Request, res: Response) => {
      const userResponse = await user_controller.createUser(req, res);

      WebSocketService.createEvent(req, userResponse, Event.USER_CREATED);
    }
  )

  .post(
    Routes.UPDATE_USER_AFTER_DEPARTMENT,
    user_controller.updateUserAfterUpdateDepartment
  )

  .put(Routes.CREATE_PASSWORD, user_controller.finalizeRegistration)

  .put(Routes.UPDATE_USER, user_controller.updateUsers)

  .delete(Routes.DELETE_USER, user_controller.deleteUsers)

  .delete(
    Routes.DELETE_USER_AFTER_DEPARTMENT,
    user_controller.deleteUserAfterDepartment
  );

export default user_route;
