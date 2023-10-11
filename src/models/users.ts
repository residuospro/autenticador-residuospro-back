import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../utils/interfaces";

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  idDepartment: {
    type: String,
    required: false,
  },
  idCompany: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  role: [
    {
      type: String,
      required: false,
    },
  ],
  email: {
    type: String,
    trim: true,
    require: false,
    lowercase: true,
    validate: {
      validator(value: string) {
        return value.includes("@");
      },
      message: "Email inválido",
    },
  },
  ramal: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});

const User = mongoose.model<IUserSchema>("User", userSchema);

export default User;
