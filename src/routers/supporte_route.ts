import express from "express";
import { Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";

const support_route = express.Router();
const support_controller = new UserController();

support_route.post(Routes.SAVE_SUPPORT, support_controller.createUser);

export default support_route;
