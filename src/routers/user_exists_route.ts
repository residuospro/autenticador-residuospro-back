import express from "express";
import { Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";

const user_exists_route = express.Router();
const user_exists_controller = new UserController();

user_exists_route.post(
  Routes.USER_EXISTS,
  user_exists_controller.validateUsername
);

export default user_exists_route;
