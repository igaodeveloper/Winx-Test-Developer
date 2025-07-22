import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { errorHandler } from './middlewares/errorHandler';
import productRoutes from './routes/productRoutes';
import { setupSwagger } from './docs/swagger';

const app = express();

setupSwagger(app);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/products', productRoutes);

app.use(errorHandler);

export default app; 