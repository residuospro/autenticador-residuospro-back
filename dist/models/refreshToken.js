"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const refreshTokenSchema = new mongoose_1.default.Schema({
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
const RefreshToken = mongoose_1.default.model("refreshToken", refreshTokenSchema);
exports.default = RefreshToken;
//# sourceMappingURL=refreshToken.js.map