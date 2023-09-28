import express, { Request, Response, Express } from "express";
import cors from "cors";
import user_route from "./users_route";
import {
  verifyToken,
  cacheControlMiddleware,
  errorHandler,
  verifyPermission,
} from "../middleware";
import login_route from "./login_route";
import payload_route from "./payload_route";
import refresh_token_route from "./refreshToken_route";
import verifyToken_route from "./verifytoken_route";
import { typePermissions } from "../utils/permissions";

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("Autenticador ativo");
  });

  app.use(
    express.json(),
    cors(),
    cacheControlMiddleware,
    login_route,
    verifyToken_route,
    refresh_token_route,
    user_route,
    verifyToken,
    verifyPermission(typePermissions),
    payload_route,
    errorHandler
  );
};

export default router;
