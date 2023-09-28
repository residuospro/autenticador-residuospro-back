"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
            required: true,
        },
    ],
    email: {
        type: String,
        trim: true,
        require: false,
        lowercase: true,
        validate: {
            validator(value) {
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
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=users.js.map