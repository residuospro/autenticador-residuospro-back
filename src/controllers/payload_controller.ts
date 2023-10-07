import TokenService from "../services/token_service";
import { Request, Response } from "express";

class PayloadController {
  async payload(req: Request, res: Response) {
    const token = req.token as string;

    const user = await TokenService.decodedTokenService(token);

    if (!user) {
      res.status(401).send({ message: "Token inválido" });
    }

    return res.status(200).json(user);
  }
}

export default PayloadController;
