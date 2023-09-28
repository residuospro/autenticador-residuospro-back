import TokenController from "../controllers/token_controller";
import express from "express";
import { Routes } from "../utils/enum";

const refresh_token_route = express.Router();
const refresh_token_controller = new TokenController();

refresh_token_route.post(
  Routes.REFRESH_TOKEN,
  refresh_token_controller.createRefreshToken
);

export default refresh_token_route;
