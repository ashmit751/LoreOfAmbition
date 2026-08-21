import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.js';
import { profilesRouter } from './routes/profiles.js';
import { loreRouter } from './routes/lore.js';
import { discoverRouter } from './routes/discover.js';
import { uploadRouter } from './routes/upload.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/health', healthRouter);
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/lore-posts', loreRouter);
app.use('/api/discover', discoverRouter);
app.use('/api/upload', uploadRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    error: error instanceof Error ? error.message : 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Lore backend listening on http://localhost:${port}`);
});