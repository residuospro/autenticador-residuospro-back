import { Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
  name: string;
  permission: string[];
  userId: string;
  email: string;
  username: string;
  idCompany: string;
  idDepartment: string;
  department: string;
  ramal: number;
}

export interface ITokenResponse {
  token: string;
  refreshToken: string;
}

export interface IUserSchema extends Document {
  name: string;
  idDepartment?: string;
  department?: string;
  idCompany?: string;
  role: string[];
  ramal: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

export interface IUser {
  name?: string;
  username?: string;
  password?: string;
  email?: string;
  ramal?: string;
  department?: string;
  idDepartment?: string;
  id?: string;
  service?: string;
  permission?: Array<string>;
  userId?: string;
}

export interface UserDataService {
  name: string;
  idDepartment: string;
  department: string;
  idCompany: string;
  role: string[];
  ramal: number;
  username?: string;
  password: string;
  email: string;
  service: string;
}

export interface IRefreshToken extends Document {
  userId: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}
