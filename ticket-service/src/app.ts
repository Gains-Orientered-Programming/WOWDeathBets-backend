// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/ticket-routes';
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongodbURI = process.env.MONGODB_URI ?? '';

const port = 8080;

app.listen(port, () => {
  console.log(`Ticket Service listening at http://localhost:${port}`);

  mongoose.connect(mongodbURI);

  routes(app);
});

export default app;
