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
import support_route from "./supporte_route";
import user_exists_route from "./user_exists_route";
import { typePermissions, UserPermissions } from "../utils/permissions";
import { Socket } from "socket.io";

declare module "express-serve-static-core" {
  interface Request {
    io: Socket;
    pusher: any;
  }
}

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
    support_route,
    user_exists_route,
    verifyToken,
    verifyPermission(UserPermissions),
    user_route,
    verifyPermission(typePermissions),
    payload_route,
    errorHandler
  );
};

export default router;
