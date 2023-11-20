// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user-routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// const mongodbURI = process.env.MONGODB_URI || '';
const mongodbURI = 'mongodb+srv://users:Eq6ylDvIvlmgs6AN@users.jg9w7bo.mongodb.net/';

mongoose.connect(mongodbURI);

// Include user routes
app.use('/users', userRoutes);

export default app;
