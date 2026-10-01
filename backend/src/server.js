import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dns from 'node:dns';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import leadRoutes from './routes/leadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const app = express();

const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const clientUrl = process.env.CLIENT_URL;
    const allowed = clientUrl ? [clientUrl, ...DEV_ORIGINS] : DEV_ORIGINS;
    const isLanIp = /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin) ||
                    /^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/.test(origin);
    if (allowed.includes(origin) || isLanIp || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use(errorHandler);

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`✗ MongoDB Error: ${err.message}`);
    console.warn('⚠ Running without database — form submissions will fail');
  }
};

const start = async () => {
  await connect();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV}`);
    console.log(`✓ API Health: http://localhost:${PORT}/api/health`);
  });
};

start();
