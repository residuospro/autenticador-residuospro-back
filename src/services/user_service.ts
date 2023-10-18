import bcrypt from "bcrypt";
import User from "../models/users";
import { IUser, UserDataService } from "../utils/interfaces";
import { Actions, Permissions } from "../utils/enum";
import HandleError from "../utils/errors/handleError";
import PermissionMapper from "../utils/errors/mapPermission";
import EmailService from "./email_service";
import mongoose from "mongoose";

class UserService {
  static async createUser(userData: UserDataService, permission: string) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const { service, email } = userData;

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      userData.password = hashedPassword;

      userData.role = PermissionMapper.getCreatablePermission(permission);

      const newUser = new User({
        ...userData,
      });

      const savedUser = await newUser.save({ session });

      if (savedUser) {
        await EmailService.sendEmail(
          email,
          service,
          savedUser.id,
          Actions.CREATE
        );
      }

      await session.commitTransaction();
      session.endSession();

      return savedUser;
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
    idDepartment: string
  ) {
    try {
      const query: any = { role: { $in: [role] }, deleted: false };

      if (idCompany) {
        query["idCompany"] = idCompany;
      }

      if (idDepartment) {
        query["idDepartment"] = idDepartment;
      }

      const users = await User.find(query).skip(skip).limit(itemsPerPage);

      if (users.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalUsers = await User.find(query).count();

      const totalPages = Math.ceil(totalUsers / itemsPerPage);

      return { users, totalPages };
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
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

      const user = await User.findOne(query);

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
      await User.updateMany(
        { idDepartment: id },
        { deleted: true, deletedAt: new Date() }
      );
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
