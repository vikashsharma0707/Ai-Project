// // // import express from 'express';
// // // import morgan from 'morgan';
// // // import cors from 'cors';
// // // import helmet from 'helmet';
// // // import cookieParser from 'cookie-parser';
// // // import path from 'path';
// // // import { fileURLToPath } from 'url';
// // // import { env } from './config/env.js';
// // // import authRoutes from './routes/authRoutes.js';
// // // import productRoutes from './routes/productRoutes.js';
// // // import orderRoutes from './routes/orderRoutes.js';
// // // import adminRoutes from './routes/adminRoutes.js';
// // // import aiRoutes from './routes/aiRoutes.js';
// // // import { notFound, errorHandler } from './middlewares/error.js';


// // // const app = express();
// // // const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // // app.use(helmet());
// // // app.use(morgan('dev'));
// // // app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
// // // app.use(express.json({ limit: '1mb' }));
// // // app.use(express.urlencoded({ extended: true }));
// // // app.use(cookieParser());

// // // // Static uploads with cache headers
// // // const uploadsPath = path.join(__dirname, 'uploads');
// // // app.use('/uploads', express.static(uploadsPath, {
// // //   etag: true,
// // //   maxAge: '30d',
// // //   setHeaders: (res) => res.setHeader('Cache-Control', 'public, max-age=2592000, immutable')
// // // }));

// // // app.get('/', (_req, res) => res.json({ ok: true, name: 'myntra-backend' }));

// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/products', productRoutes);
// // // app.use('/api/orders', orderRoutes);
// // // app.use('/api/admin', adminRoutes);
// // // app.use('/api/ai', aiRoutes);

// // // app.use(notFound);
// // // app.use(errorHandler);

// // // export default app;


// // import express from 'express';
// // import morgan from 'morgan';
// // import cors from 'cors';
// // import helmet from 'helmet';
// // import cookieParser from 'cookie-parser';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // import { env } from './config/env.js';

// // import authRoutes from './routes/authRoutes.js';
// // import productRoutes from './routes/productRoutes.js';
// // import orderRoutes from './routes/orderRoutes.js';
// // import adminRoutes from './routes/adminRoutes.js';
// // import aiRoutes from './routes/aiRoutes.js';
// // import paymentsRoutes from './routes/paymentsRoutes.js';

// // import { notFound, errorHandler } from './middlewares/error.js';


// // const app = express();
// // const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // /** Security & basics */
// // app.use(helmet());
// // app.use(morgan('dev'));

// // /** CORS (allow dev UI + any comma-separated extra origins in CLIENT_URL) */
// // const allow = (env.CLIENT_URL || '').split(',').map(s => s.trim()).filter(Boolean);
// // const corsOpts = {
// //   origin: (origin, cb) => {
// //     if (!origin) return cb(null, true);
// //     if (allow.length === 0 || allow.includes(origin)) return cb(null, true);
// //     return cb(new Error('CORS blocked: ' + origin), false);
// //   },
// //   credentials: true
// // };
// // app.use(cors(corsOpts));

// // app.use(express.json({ limit: '1mb' }));
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // /** Static uploads with strong cache */
// // const uploadsPath = path.join(__dirname, 'uploads'); // /backend/uploads
// // app.use('/uploads', express.static(uploadsPath, {
// //   etag: true,
// //   maxAge: '30d',
// //   setHeaders: (res) => res.setHeader('Cache-Control', 'public, max-age=2592000, immutable')
// // }));

// // /** Health */
// // app.get('/', (_req, res) => res.json({ ok: true, name: 'myntra-backend' }));

// // /** API routes */
// // app.use('/api/payments', paymentsRoutes); // Razorpay
// // app.use('/api/auth', authRoutes);
// // app.use('/api/products', productRoutes);
// // app.use('/api/orders', orderRoutes);
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/ai', aiRoutes);

// // /** Errors */
// // app.use(notFound);
// // app.use(errorHandler);

// // export default app;


// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import { env } from './config/env.js';

// import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
// import aiRoutes from './routes/aiRoutes.js';
// import paymentsRoutes from './routes/paymentsRoutes.js';

// import { notFound, errorHandler } from './middlewares/error.js';

// const app = express();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// /** Security & basics
//  *  Allow cross-origin resource embedding (images from /uploads on :5000 used in React on :5173)
//  */
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: 'cross-origin' },
//   crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }
// }));
// app.use(morgan('dev'));

// /** CORS (allow dev UI + any comma-separated extra origins in CLIENT_URL) */
// const allow = (env.CLIENT_URL || '').split(',').map(s => s.trim()).filter(Boolean);
// const corsOpts = {
//   origin: (origin, cb) => {
//     if (!origin) return cb(null, true);
//     if (allow.length === 0 || allow.includes(origin)) return cb(null, true);
//     return cb(new Error('CORS blocked: ' + origin), false);
//   },
//   credentials: true
// };
// app.use(cors(corsOpts));

// app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// /** Static uploads with strong cache & CORP header */
// const uploadsPath = path.join(__dirname, 'uploads'); // /backend/uploads
// app.use(
//   '/uploads',
//   // add CORS for images so the React origin can fetch them
//   (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', allow[0] || '*');
//     next();
//   },
//   express.static(uploadsPath, {
//     etag: true,
//     maxAge: '30d',
//     setHeaders: (res) => {
//       res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
//       // critical: allow cross-origin image embedding to fix NotSameOrigin error
//       res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
//     }
//   })
// );

// /** Health */
// app.get('/', (_req, res) => res.json({ ok: true, name: 'myntra-backend' }));

// /** API routes */
// app.use('/api/payments', paymentsRoutes); // Razorpay
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/ai', aiRoutes);


// /** Errors */
// app.use(notFound);
// app.use(errorHandler);

// export default app;




// app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import { env } from './config/env.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import paymentsRoutes from './routes/paymentsRoutes.js';

import { notFound, errorHandler } from './middlewares/error.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Security & basics */
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
}));
app.use(morgan('dev'));

/** OPEN CORS for all origins (no cookies) */
const corsOpen = {
  origin: '*',                                   // allow ALL origins
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  exposedHeaders: ['Content-Length','X-Request-Id'],
  maxAge: 86400,
  credentials: false,                             // must be false with "*"
};
app.use(cors(corsOpen));
app.options('*', cors(corsOpen));                 // preflight

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/** Static uploads (public, cache, open CORS) */
const uploadsPath = path.join(__dirname, 'uploads');
app.use(
  '/uploads',
  cors({ origin: '*', methods: ['GET'], maxAge: 86400, credentials: false }),
  express.static(uploadsPath, {
    etag: true,
    maxAge: '30d',
    setHeaders(res) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  })
);

/** Health */
app.get('/', (_req, res) => res.json({ ok: true, name: 'myntra-backend' }));

/** API routes */
app.use('/api/payments', paymentsRoutes); // Razorpay
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

/** Errors */
app.use(notFound);
app.use(errorHandler);

export default app;
