// backend/src/models/User.ts
import mongoose from 'mongoose';
import { z } from 'zod';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

export const UserValidation = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

export const User = mongoose.model('User', UserSchema);