import jwt from "jsonwebtoken";
import TokenModel from "../models/refreshToken";
import User from "../models/users";
import { IUserSchema, UserPayload } from "../utils/interfaces";

let JWT_SECRET = String(process.env.SECRET_KEY);

class TokenService {
  static async generateRefreshToken(userId: string) {
    try {
      const refreshToken = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "2d",
      });

      const token = new TokenModel({
        userId,
        refreshToken,
      });

      const saveToken = await token.save();

      if (saveToken) return refreshToken;
    } catch (error) {
      return error;
    }
  }

  static generateAcessToken(config: Partial<IUserSchema>): string {
    const token = jwt.sign(config, JWT_SECRET, { expiresIn: "5h" });

    return token;
  }

  static verifyToken(token: string) {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    return decodedToken;
  }

  static async updateRefreshToken(oldRefreshToken: string) {
    const userInfo = this.verifyToken(oldRefreshToken) as any;

    const refresh_token = await TokenModel.findOne({
      refreshToken: oldRefreshToken,
    });

    const user = await User.findById(userInfo.userId);

    if (refresh_token) {
      const token = this.generateAcessToken(user);

      const refreshToken = await this.generateRefreshToken(user.id);

      return { token, refreshToken };
    }

    return null;
  }

  static decodedTokenService(jwtToken: string): UserPayload {
    const decodedToken = jwt.decode(jwtToken) as UserPayload;

    if (decodedToken) {
      const {
        name,
        username,
        role,
        idCompany,
        id,
        idDepartment,
        department,
        ramal,
        email,
      } = decodedToken;

      return {
        name,
        username,
        permission: role,
        idCompany,
        userId: id,
        idDepartment,
        department,
        ramal,
        email,
      };
    }

    return null;
  }
}

export default TokenService;
