import TokenService from "../services/token_service";
import { Request, Response } from "express";

class PayloadController {
  async payload(req: Request, res: Response) {
    const token = req.token as string;

    const user = await TokenService.decodedTokenService(token);

    let data: any = {
      name: user?.name,
      username: user?.username,
      permission: user?.permission,
      company: user.company,
      userId: user.userId,
    };

    if (user?.idDepartment) {
      data = {
        ...data,
        idDepartment: user.idDepartment,
        department: user.department,
        ramal: user.ramal,
      };
    }

    if (!user) {
      res.status(401).send({ message: "Token inválido" });
    }

    return res.status(200).json(data);
  }
}

export default PayloadController;
