import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('✅ Mongo connected');
  } catch (e) {
    console.error('Mongo error', e.message);
    process.exit(1);
  }
};
