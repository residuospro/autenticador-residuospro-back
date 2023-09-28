import bcrypt from "bcrypt";
import { ITokenResponse, IUserSchema } from "../utils/interfaces";
import HandleError from "../utils/errors/handleError";
import TokenService from "../services/token_service";
import User from "../models/users";

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
      const token = TokenService.generateAcessToken(
        user.role,
        user.name,
        user._id,
        user.email
      );

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
