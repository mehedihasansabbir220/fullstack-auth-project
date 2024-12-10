// backend/src/config/database.ts
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || '');
      logger.info('MongoDB connected successfully');
    } catch (error) {
      logger.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };
  
  export default connectDB;