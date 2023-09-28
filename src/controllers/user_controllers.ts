import { Request, Response } from "express";
import UserService from "../services/user_service";
import { IUser } from "../utils/interfaces";
import HandleError from "../utils/errors/handleError";
import PasswordGenerator from "../utils/passwordGenerator";
import { Service } from "../utils/enum";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const {
        name,
        idDepartment,
        department,
        idCompany,
        role,
        ramal,
        email,
        service,
      } = req.body;

      const user = req.user;

      const generator = new PasswordGenerator();

      const password = generator.generateRandomPassword();

      const createUser = await UserService.createUser(
        {
          name,
          idDepartment,
          department,
          idCompany,
          role,
          ramal,
          password,
          email,
          service,
        },
        user.permission[0]
      );

      return res.status(201).json(createUser);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async getUsersByRole(req: Request, res: Response) {
    try {
      const { page, itemsPerPage, role, idCompany, idDepartment } = req.body;
      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const users = await UserService.getUsers(
        role,
        skip,
        itemsPerPage,
        idCompany,
        idDepartment
      );

      return res.status(200).json(users);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async getAllUsernames(req: Request, res: Response) {
    try {
      const { idCompany, role, idDepartment } = req.body;

      const users = await UserService.getAllUsernamesService(
        idCompany,
        role,
        idDepartment
      );

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getUserByUsername(req: Request, res: Response) {
    try {
      const { username, idCompany, role } = req.body;

      const user = await UserService.getUsername({
        username,
        idCompany,
        role,
      });

      if (user) {
        return res.status(200).json(user);
      }

      return res.status(404).send({ message: "Usuário não encontrado" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async validateUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;

      const { id } = req.params;

      const existingUsername = await UserService.validateUsernameService(
        username,
        id
      );

      return res.status(200).json(existingUsername);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async finalizeRegistration(req: Request, res: Response) {
    try {
      const { username, password, service }: IUser = req.body;

      const { id } = req.params;

      await UserService.finalizeRegistrationService([{ username, password }], id);

      if (service == Service.RESIDUOSPRO) {
        let url = process.env.RESIDUOS_SERVICE;

        return res.status(200).send(url);
      }

      return res.status(204).send("Senha redefinida com sucesso");
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async updateUsers(req: Request, res: Response) {
    try {
      const {
        name,
        username,
        password,
        ramal,
        email,
        department,
        idDepartment,
      }: IUser = req.body;

      const { id } = req.params;

      const user = await UserService.updateUser(
        [{ name, username, password, ramal, email, department, idDepartment }],
        id
      );

      return res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(404).send({ message: error.message });
    }
  }

  async deleteUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserService.deleteUser(id);

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).send({ message: error.message });
    }
  }
}

export default UserController;
