import jwt from "jsonwebtoken";
import TokenModel from "../models/refreshToken";
import User from "../models/users";
import { UserPayload } from "../utils/interfaces";

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

  static generateAcessToken(
    permission: string[],
    name: string,
    userId: string,
    email: string
  ): string {
    let config: any = {
      permission,
      name,
      userId,
      email,
    };

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
      const token = this.generateAcessToken(
        user.role,
        user.name,
        userInfo.userId,
        user.email
      );

      const refreshToken = await this.generateRefreshToken(user.id);

      return { token, refreshToken };
    }
    return null;
  }

  static decodedTokenService(jwtToken: string): UserPayload {
    const decodedToken = jwt.decode(jwtToken) as UserPayload;

    if (decodedToken && decodedToken.exp) {
      const {
        name,
        username,
        permission,
        company,
        userId,
        idDepartment,
        department,
        ramal,
        email,
      } = decodedToken;

      return {
        name,
        username,
        permission,
        company,
        userId,
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
