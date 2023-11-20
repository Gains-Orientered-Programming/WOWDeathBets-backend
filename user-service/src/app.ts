// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user-routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://users:Eq6ylDvIvlmgs6AN@users.jg9w7bo.mongodb.net/');

// Include user routes
app.use('/users', userRoutes);

export default app;
