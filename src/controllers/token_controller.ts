import { Request, Response } from "express";
import TokenService from "../services/token_service";
import { UserPayload } from "../utils/interfaces";

class TokenController {
  async createRefreshToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      const refresh_token = await TokenService.updateRefreshToken(token);

      return res.status(200).json(refresh_token);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async validatedToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        res.status(401).json({ message: "Token não fornecido" });
        return;
      }

      const validToken = TokenService.verifyToken(token);

      return res.status(200).json(validToken);
    } catch (error) {
      return res.status(401).json({ message: "Token invalido" });
    }
  }
}

export default TokenController;
