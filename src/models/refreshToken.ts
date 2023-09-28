import mongoose, { Schema } from "mongoose";
import { IRefreshToken } from "../utils/interfaces";

const refreshTokenSchema: Schema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
  updateAt: {
    type: Date,
  },
});

const RefreshToken = mongoose.model<IRefreshToken>(
  "refreshToken",
  refreshTokenSchema
);

export default RefreshToken;
