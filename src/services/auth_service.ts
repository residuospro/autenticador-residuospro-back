import bcrypt from "bcrypt";
import { ITokenResponse, IUserSchema } from "../utils/interfaces";
import HandleError from "../utils/errors/handleError";
import TokenService from "../services/token_service";
import User from "../models/users";
import { Permissions } from "../utils/enum";

abstract class IAuthService {
  abstract findUserByUsername(username: string): Promise<IUserSchema | null>;

  abstract comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean>;

  abstract generateTokens(user: IUserSchema): Promise<ITokenResponse>;
}

class AuthService implements IAuthService {
  async findUserByUsername(username: string): Promise<IUserSchema> {
    try {
      const user = await User.findOne({ username, deleted: false });

      return user;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateTokens(user: IUserSchema): Promise<ITokenResponse> {
    try {
      let config: Partial<IUserSchema> = {
        role: user.role,
        name: user.name,
        id: user.id,
        email: user.email,
        username: user.username,
      };

      if (user.role[0] == Permissions.ADMIN) {
        config = { ...config, idCompany: user.idCompany };
      } else if (
        user.role[0] == Permissions.MANAGER ||
        user.role[0] == Permissions.COLLABORATOR
      ) {
        config = {
          ...config,
          idCompany: user.idCompany,
          idDepartment: user.idDepartment,
          department: user.department,
          ramal: user.ramal,
        };
      }

      const token = TokenService.generateAcessToken(config);

      const refreshToken = await TokenService.generateRefreshToken(user.id);

      return { token, refreshToken };
    } catch (error) {
      return error;
    }
  }

  parseCredentials(
    authHeader: string
  ): { username: string; password: string } | null {
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return null;
    }

    const base64Credentials = authHeader.slice(6);

    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "utf-8"
    );

    if (!credentials) {
      return null;
    }

    const [username, password] = credentials.split(":");

    if (!username || !password) {
      return null;
    }

    return { username, password };
  }
}

export default AuthService;
