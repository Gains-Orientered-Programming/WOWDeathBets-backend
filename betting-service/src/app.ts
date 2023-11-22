// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/betting-routes';
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongodbURI = process.env.MONGODB_URI || '';

mongoose.connect(mongodbURI);

app.use('/bettings', userRoutes);

const port = 8080;

app.listen(port, () => {
  console.log(`Betting Service listening at http://localhost:${port}`);
});

export default app;
