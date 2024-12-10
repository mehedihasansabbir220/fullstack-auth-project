"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserValidation = exports.UserSchema = void 0;
// backend/src/models/User.ts
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });
exports.UserValidation = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.User = mongoose_1.default.model('User', exports.UserSchema);
