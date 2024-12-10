// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserValidation } from '../models/User';
import {logger} from '../utils/logger';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = UserValidation.parse(req.body);
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error('Registration error', error);
    res.status(500).json({ message: 'Registration failed', error });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { userId: user._id, role: user.role }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '1h' }
      );
  
      res.json({ 
        token, 
        user: { 
          id: user._id, 
          username: user.username, 
          email: user.email, 
          role: user.role 
        } 
      });
    } catch (error) {
      logger.error('Login error', error);
      res.status(500).json({ message: 'Login failed' });
    }
  };