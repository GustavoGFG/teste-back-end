// server.js
import express from 'express';
import { connectDB } from './config/db';
import { config } from './config/env';
import cors from 'cors';

import userRoutes from '../src/routes/userRoutes';
import productRoutes from './routes/productRoutes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api', productRoutes);

connectDB();
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
