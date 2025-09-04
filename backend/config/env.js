// import dotenv from 'dotenv';
// dotenv.config();

// export const env = {
//   PORT: process.env.PORT || 5000,
//   MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myntra_clone',
//   JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
//   CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
//   AI_PROVIDER: process.env.AI_PROVIDER || 'stub',
//   OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
//   OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
//   AI_MODEL: process.env.AI_MODEL || 'gpt-4o-mini'
// };

import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myntra_clone',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  AI_PROVIDER: process.env.AI_PROVIDER || 'stub',
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  AI_MODEL: process.env.AI_MODEL || 'gpt-4o-mini',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || ''
};
