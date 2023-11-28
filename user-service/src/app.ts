// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user-routes';
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongodbURI = process.env.MONGODB_URI || '';

const port = 8080;

app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);

  mongoose.connect(mongodbURI);

  userRoutes(app);
});

export default app;
