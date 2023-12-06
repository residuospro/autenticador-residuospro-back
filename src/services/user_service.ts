import bcrypt from "bcrypt";
import User from "../models/users";
import { IUser, UserDataService } from "../utils/interfaces";
import { Actions } from "../utils/enum";
import HandleError from "../utils/errors/handleError";
import PermissionMapper from "../utils/errors/mapPermission";
import EmailService from "./email_service";
import mongoose from "mongoose";

class UserService {
  static async createUser(userData: UserDataService, permission: string) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const { service, email, idCompany, idDepartment } = userData;

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      userData.password = hashedPassword;

      userData.role = PermissionMapper.getCreatablePermission(permission);

      const newUser = new User({
        ...userData,
      });

      const items = await newUser.save({ session });

      if (items) {
        await EmailService.sendEmail(email, service, items.id, Actions.CREATE);
      }
      const itemsPerPage = 10;

      const totalPages = await UserService.userCountService(
        idCompany,
        null,
        userData.role[0],
        itemsPerPage,
        false
      );

      await session.commitTransaction();
      session.endSession();

      return { items, totalPages };
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getUsers(
    role: string,
    skip: number,
    itemsPerPage: number,
    idCompany: string,
    idDepartment: string,
    throwException: boolean
  ) {
    try {
      const userService = new UserService();

      const query = userService.createQuery(idCompany, idDepartment, role);

      const users = await User.find(query).skip(skip).limit(itemsPerPage);

      if (users.length == 0 && throwException) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalPages = await this.userCountService(
        idCompany,
        idDepartment,
        role,
        itemsPerPage,
        throwException
      );

      return { users, totalPages };
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async userCountService(
    idCompany: string,
    idDepartment: string,
    role: string,
    itemsPerPage: number,
    throwException: boolean
  ) {
    try {
      const userService = new UserService();

      const query = userService.createQuery(idCompany, idDepartment, role);

      let totalUsers = await User.find(query).count();

      if (!throwException) totalUsers += 1;

      const totalPages = Math.ceil(totalUsers / itemsPerPage);

      return totalPages;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private createQuery(idCompany: string, idDepartment: string, role: string) {
    const query: any = { role: { $in: [role] }, deleted: false };

    if (idCompany) {
      query["idCompany"] = idCompany;
    }

    if (idDepartment) {
      query["idDepartment"] = idDepartment;
    }

    return query;
  }

  static async validateUsernameService(
    username: string,
    id: string
  ): Promise<null> {
    try {
      const user = await User.findById(id, { deleted: false });

      const idCompany = user.idCompany;

      const existingUsername = await User.findOne({
        username,
        idCompany,
        deleted: false,
      });

      if (existingUsername != null) {
        throw new HandleError("Nome de usuário já existe", 409);
      }

      return null;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getUsername(users: any) {
    try {
      const { username, idCompany, role } = users;

      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username);

      let query: any = {
        idCompany,
        role: { $in: [role] },
        deleted: false,
      };

      if (regex) {
        query = { ...query, email: username };
      } else {
        query = { ...query, username };
      }

      const user = await User.find(query);

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getAllUsernamesService(
    idCompany: string,
    role: string[],
    idDepartment: string
  ) {
    try {
      let query: any = {
        idCompany,
        role: { $in: [role] },
        deleted: false,
      };

      if (idDepartment) {
        query = { ...query, idDepartment };
      }

      const users = await User.find(query);

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async finalizeRegistrationService(updatedData: IUser[], id: string) {
    try {
      let user: any;

      if (id) {
        user = await User.findById(id, { deleted: false });
      } else {
        user = await User.findOne({
          username: updatedData[0].username,
          deleted: false,
        });
      }

      if (user == null) {
        throw new HandleError("Username não encontrado", 404);
      }

      const saltRounds = 8;

      const hashedPassword = await bcrypt.hash(
        updatedData[0].password,
        saltRounds
      );

      user.password = hashedPassword;
      user.username = updatedData[0].username;

      await user!.save();

      return true;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Usuário não encontrado");
    }
  }

  static async updateUser(updatedData: IUser[], id: string) {
    try {
      let existingUser: any;

      if (updatedData[0].username) {
        existingUser = await User.findOne({
          username: updatedData[0].username,
          deleted: false,
        });
      }

      if (existingUser != null) {
        throw new HandleError("Nome de usuário já existe", 409);
      }

      let user = (await User.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof IUser];

        if (value) {
          user[key] = value;
        }
      }

      const updatedUser = await user!.save();

      return updatedUser;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Usuário não encontrado");
    }
  }

  static async updateUserAfterUpdateDepartmentService(
    name: string,
    ramal: number,
    id: string
  ) {
    try {
      if (name) {
        await User.updateMany(
          { idDepartment: id },
          {
            department: name,
          }
        );
      }

      if (ramal) {
        await User.updateMany(
          { idDepartment: id },
          {
            ramal,
          }
        );
      }
    } catch (error) {
      return error;
    }
  }

  static async deleteUser(userId: string) {
    try {
      const currentDate = new Date();

      const user = await User.findByIdAndUpdate(
        userId,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return user;
    } catch (error: any) {
      throw new Error("Usuário não encontrado");
    }
  }

  static async deleteUserAfterDepartmentService(id: string) {
    try {
      const user = await User.updateMany(
        { idDepartment: id },
        { deleted: true, deletedAt: new Date() }
      );

      console.log(user);
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
